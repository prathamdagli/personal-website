import Image from "next/image";
import { ImageIcon } from "lucide-react";
import type { Project } from "@/data/projects";

export function ProjectMedia({ project }: { project: Project }) {
  const { image, video, poster, alt } = project.media;
  return (
    <div className="project-media-slot">
      {image ? (
        <Image
          src={image}
          alt={alt}
          fill
          sizes="(max-width:700px) 84vw, (max-width:1000px) 220px, 280px"
          loading="lazy"
        />
      ) : (
        <div className="project-media-placeholder">
          <ImageIcon size={22} strokeWidth={1} />
          <span>{project.title}</span>
          <small>Project media coming soon</small>
        </div>
      )}
      {video && (
        <details className="project-video">
          <summary>Watch project demo</summary>
          <video
            src={video}
            poster={poster || image}
            controls
            muted
            loop
            playsInline
            preload="none"
            aria-label={`${project.title} demonstration`}
          />
        </details>
      )}
    </div>
  );
}
