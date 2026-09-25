import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface TimelineItem {
  id: string | number;
  title: string;
  date: string;
  detail?: string;
  status: "completed" | "in-progress" | "pending";
  icon?: ReactNode;
}

interface TrackingTimelineProps {
  items: TimelineItem[];
  className?: string;
}

const TrackingTimeline = ({ items, className }: TrackingTimelineProps) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  const itemVariants = {
    hidden: { y: 8, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <motion.ol
      className={cn("track", className)}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {items.map((item) => (
        <motion.li
          key={item.id}
          className={cn("track-item", `is-${item.status}`)}
          variants={itemVariants}
          aria-current={item.status === "in-progress" ? "step" : undefined}
        >
          <span className="track-mark" aria-hidden="true">
            {item.icon}
          </span>
          <div className="track-copy">
            <h3>{item.title}</h3>
            {item.detail ? <p>{item.detail}</p> : null}
          </div>
          {item.date ? <time>{item.date}</time> : <span />}
        </motion.li>
      ))}
    </motion.ol>
  );
};

export default TrackingTimeline;
