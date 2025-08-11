// src\services\performanceService.ts
import { UserVariantAssignment } from "../models/UserVariantAssignment";
import { UserVariantEvent } from "../models/UserVariantEvent";

export async function fetchFullPerformanceStats() {
  // Views & User Count
  const views = await UserVariantAssignment.aggregate([
    {
      $group: {
        _id: "$variantId",
        totalViews: { $sum: "$shownCount" },
        users: { $addToSet: "$userId" }
      }
    },
    {
      $lookup: {
        from: "herovariants",
        localField: "_id",
        foreignField: "_id",
        as: "variant"
      }
    },
    { $unwind: "$variant" },
    {
      $project: {
        totalViews: 1,
        uniqueUsers: {
          $cond: {
            if: { $isArray: "$users" },
            then: { $size: "$users" },
            else: 0
          }
        },
        heading: "$variant.title",
        subtitle: "$variant.subtitle",
        ctaText: "$variant.ctaText",
      }
    }
  ]);

  // CTA Clicks
  const ctaClicks = await UserVariantEvent.aggregate([
    { $match: { event: "cta_click" } },
    {
      $group: {
        _id: "$variantId",
        totalClicks: { $sum: 1 }
      }
    }
  ]);

  // Stay Time
  const stayTimes = await UserVariantEvent.aggregate([
    { $match: { event: "stay_time" } },
    {
      $group: {
        _id: "$variantId",
        avgStayTime: { $avg: "$value" }
      }
    }
  ]);

  // Merge
  const mergeMap = new Map<string, any>();

  views.forEach((v) => {
    const id = v._id.toString();
    mergeMap.set(id, {
      variantId: id,
      totalViews: v.totalViews,
      uniqueUsers: v.uniqueUsers,
      heading: v.heading,
      subtitle: v.subtitle,
      ctaText: v.ctaText,
    });
  });

  ctaClicks.forEach((c) => {
    const id = c._id.toString();
    const existing = mergeMap.get(id) || {};
    const views = existing.totalViews || 0;

    mergeMap.set(id, {
      ...existing,
      ctaClicks: c.totalClicks || 0,
      bounceRate: views > 0
        ? ((views - (c.totalClicks || 0)) / views) * 100
        : 0,
    });
  });

  stayTimes.forEach((s) => {
    const id = s._id.toString();
    mergeMap.set(id, {
      ...(mergeMap.get(id) || {}),
      avgStayTime: s.avgStayTime,
    });
  });

  return Array.from(mergeMap.values());
}
