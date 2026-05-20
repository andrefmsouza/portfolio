"use client";

import { motion, useMotionValue, useTransform, MotionValue } from "framer-motion";
import { useState } from "react";
import { TbBrandTypescript, TbBrandReactNative } from "react-icons/tb";
import {
  FaAngular, FaAws, FaBootstrap, FaCss3,
  FaGit, FaHtml5, FaNodeJs, FaPython, FaReact, FaVuejs,
} from "react-icons/fa";
import { RiJavascriptLine, RiNextjsFill, RiPhpLine, RiTailwindCssFill } from "react-icons/ri";
import { SiAnthropic, SiArduino, SiMysql, SiOpenai } from "react-icons/si";
import { BiLogoPostgresql } from "react-icons/bi";
import { IconType } from "react-icons";

interface Skill {
  name: string;
  Icon: IconType;
  x: number;
  y: number;
  isCenter?: boolean;
}

function ringPos(i: number, total: number, r: number, startAngleDeg = -90) {
  const angle = ((startAngleDeg + (i / total) * 360) * Math.PI) / 180;
  return {
    x: Math.round(Math.cos(angle) * r),
    y: Math.round(Math.sin(angle) * r),
  };
}

const ICON_SIZE    = 72;
const CENTER_SIZE  = 86;
const CLUSTER_SIZE = 660;
const R1 = 125;
const R2 = 245;

// Apple Watch scale constants
// At dist=0 (screen center) → MAX_SCALE; at dist≥MAX_DIST → MIN_SCALE
const MAX_SCALE = 1.45;
const MIN_SCALE = 0.42;
const MAX_DIST  = 290;

const skills: Skill[] = [
  { name: "Node.js",       Icon: FaNodeJs,          x: 0, y: 0, isCenter: true },
  { name: "TypeScript",    Icon: TbBrandTypescript,  ...ringPos(0, 7, R1) },
  { name: "React",         Icon: FaReact,            ...ringPos(1, 7, R1) },
  { name: "AWS",           Icon: FaAws,              ...ringPos(2, 7, R1) },
  { name: "React Native",  Icon: TbBrandReactNative, ...ringPos(3, 7, R1) },
  { name: "JavaScript",    Icon: RiJavascriptLine,   ...ringPos(4, 7, R1) },
  { name: "Anthropic",     Icon: SiAnthropic,        ...ringPos(5, 7, R1) },
  { name: "OpenAI",        Icon: SiOpenai,           ...ringPos(6, 7, R1) },
  { name: "PHP",           Icon: RiPhpLine,          ...ringPos(0,  13, R2) },
  { name: "Next.js",       Icon: RiNextjsFill,       ...ringPos(1,  13, R2) },
  { name: "Git",           Icon: FaGit,              ...ringPos(2,  13, R2) },
  { name: "Python",        Icon: FaPython,           ...ringPos(3,  13, R2) },
  { name: "Tailwind",      Icon: RiTailwindCssFill,  ...ringPos(4,  13, R2) },
  { name: "MySQL",         Icon: SiMysql,            ...ringPos(5,  13, R2) },
  { name: "PostgreSQL",    Icon: BiLogoPostgresql,   ...ringPos(6,  13, R2) },
  { name: "Vue.js",        Icon: FaVuejs,            ...ringPos(7,  13, R2) },
  { name: "Angular",       Icon: FaAngular,          ...ringPos(8,  13, R2) },
  { name: "Bootstrap",     Icon: FaBootstrap,        ...ringPos(9,  13, R2) },
  { name: "CSS3",          Icon: FaCss3,             ...ringPos(10, 13, R2) },
  { name: "HTML5",         Icon: FaHtml5,            ...ringPos(11, 13, R2) },
  { name: "Arduino",       Icon: SiArduino,          ...ringPos(12, 13, R2) },
];

// ─── Per-icon component — hooks must be called at component level ────────────

interface IconBubbleProps {
  skill: Skill;
  index: number;
  dragX: MotionValue<number>;
  dragY: MotionValue<number>;
}

function IconBubble({ skill, index, dragX, dragY }: IconBubbleProps) {
  const [hovered, setHovered] = useState(false);

  const baseSize = skill.isCenter ? CENTER_SIZE : ICON_SIZE;
  const left = CLUSTER_SIZE / 2 + skill.x - baseSize / 2;
  const top  = CLUSTER_SIZE / 2 + skill.y - baseSize / 2;

  // Core Apple Watch effect:
  // distance of this icon from the screen centre changes as user drags →
  // icons closer to centre grow, icons farther away shrink.
  const scale = useTransform(
    [dragX, dragY] as MotionValue<number>[],
    ([dx, dy]: number[]) => {
      const dist = Math.sqrt((skill.x + dx) ** 2 + (skill.y + dy) ** 2);
      const raw  = MAX_SCALE - (dist / MAX_DIST) * (MAX_SCALE - MIN_SCALE);
      return Math.max(MIN_SCALE, Math.min(MAX_SCALE, raw));
    }
  );

  // Higher scale → higher z-index so "foreground" icons sit on top
  const zIndex = useTransform(scale, s => Math.round(s * 20));

  const i = index;

  return (
    <motion.div
      className="absolute flex flex-col items-center"
      style={{ left, top, scale, zIndex }}
      animate={{
        y: [0, -(4 + (i % 4) * 2), 0, (2 + (i % 3)), 0],
        x: [0, i % 2 === 0 ? 3 : -3, 0, i % 2 === 0 ? -1.5 : 1.5, 0],
      }}
      transition={{
        duration: 3.4 + (i % 7) * 0.35,
        repeat: Infinity,
        ease: "easeInOut",
        delay: i * 0.2,
      }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      <div
        className="bg-menu rounded-2xl flex justify-center items-center shadow-sm"
        style={{
          width: baseSize,
          height: baseSize,
          fontSize: skill.isCenter ? "2.8rem" : "2.2rem",
        }}
      >
        <skill.Icon />
      </div>

      <motion.span
        className="text-[10px] font-bold mt-1.5 whitespace-nowrap pointer-events-none"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.15 }}
      >
        {skill.name}
      </motion.span>
    </motion.div>
  );
}

// ─── Main component ──────────────────────────────────────────────────────────

export function SkillsBubbles({ dragHint }: { dragHint: string }) {
  const dragX = useMotionValue(0);
  const dragY = useMotionValue(0);

  return (
    <div className="relative w-full h-[420px] sm:h-[520px] overflow-hidden rounded-2xl cursor-grab active:cursor-grabbing select-none">

      {/* Edge fade */}
      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-r from-background via-transparent to-background" />
      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-background via-transparent to-background" />

      {/* Draggable cluster — x/y motion values exposed so icons can read them */}
      <motion.div
        drag
        style={{
          x: dragX,
          y: dragY,
          width: CLUSTER_SIZE,
          height: CLUSTER_SIZE,
          position: "absolute",
          left: "50%",
          top: "50%",
          marginLeft: -CLUSTER_SIZE / 2,
          marginTop: -CLUSTER_SIZE / 2,
        }}
        dragConstraints={{ left: -265, right: 265, top: -205, bottom: 205 }}
        dragElastic={0.1}
        dragTransition={{
          power: 0.25,
          timeConstant: 220,
          bounceStiffness: 55,
          bounceDamping: 14,
        }}
      >
        {skills.map((skill, i) => (
          <IconBubble
            key={skill.name}
            skill={skill}
            index={i}
            dragX={dragX}
            dragY={dragY}
          />
        ))}
      </motion.div>

      {/* Drag hint */}
      <p className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 z-20 text-xs font-medium text-foreground/30 select-none">
        {dragHint}
      </p>
    </div>
  );
}
