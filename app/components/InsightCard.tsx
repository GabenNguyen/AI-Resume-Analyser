"use client";

import Insight from "@/type/insight";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertTriangle } from "lucide-react";

const InsightCard = ({ title, items, tone }: Insight) => {
  const isPositive = tone === "positive";

  return (
    <Card className="rounded-2xl shadow-md hover:shadow-lg transition-all duration-300">
      <CardContent className="p-6 space-y-4">
        {/* Header with icon and title */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {isPositive ? (
              <CheckCircle className="h-5 w-5 text-green-600" />
            ) : (
              <AlertTriangle className="h-5 w-5 text-amber-600" />
            )}
            <h3 className="text-2xl font-bold">{title}</h3>
          </div>
          <Badge
            variant={isPositive ? "secondary" : "destructive"}
            className="text-sm"
          >
            {items.length} {items.length === 1 ? "item" : "items"}
          </Badge>
        </div>

        {/* Item list */}
        <ul className="space-y-2 text-sm">
          {items.map((item, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex items-start gap-2"
            >
              {/* Icon prefix */}
              <span
                className={isPositive ? "text-green-600" : "text-amber-600"}
              >
                {isPositive ? "✅" : "⚠️"}
              </span>
              <p className="flex-1 text-lg">{item}</p>
            </motion.li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default InsightCard;
