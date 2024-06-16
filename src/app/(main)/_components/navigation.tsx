"use client";

import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import React, { ElementRef, useRef, useState } from "react"
import { LuChevronsLeft } from "react-icons/lu";
import { IoMenu } from "react-icons/io5";
import { useMediaQuery } from "usehooks-ts";
import UserItem from "./userItem";

const Navigation = () => {

  const pathname = usePathname();
  const isMobile = useMediaQuery("(max-width: 768px)")

  const isResizingRef = useRef(false);
  const sidebarRef = useRef<ElementRef<"aside">>(null);
  const navbarRef = useRef<ElementRef<"div">>(null);
  const [isResetting, setIsResetting] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(isMobile);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();

    isResizingRef.current = true;
    document.addEventListener("mousemove" , handleMouseMove);
    document.addEventListener("mouseup" , handleMouseUp);
  }

  const handleMouseMove = (e: MouseEvent) => {
    if(!isResizingRef.current) return;

    let newWidth = e.clientX;

    if(newWidth < 240) newWidth = 240;
    if(newWidth > 480) newWidth = 480;

    if(sidebarRef.current && navbarRef.current){
      sidebarRef.current.style.width = `${newWidth}px`;
      navbarRef.current.style.setProperty("left", `${newWidth}px`);
      navbarRef.current.style.setProperty("width", `calc(100% - ${newWidth}px)`);
    }
  }

  const handleMouseUp = () => {
    isResizingRef.current = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  }

  const resetWidth = () => {
    if(sidebarRef.current && navbarRef.current){
      setIsCollapsed(false);
      setIsResetting(true);

      sidebarRef.current.style.width = isMobile ? "100%" : "240px";
      navbarRef.current.style.setProperty(
        "width",
        isMobile ? "0" : "calc(100% - 240px)"
      );
      navbarRef.current.style.setProperty(
        "left",
        isMobile ? "100%" : "240px"
      );
      setTimeout(() => setIsResetting(false), 300);
    }
  }

  const collapse = () => {
    if(sidebarRef.current && navbarRef.current){
      setIsCollapsed(true);
      setIsResetting(true);

      sidebarRef.current.style.width = "0";
      navbarRef.current.style.setProperty("width", "100%");
      navbarRef.current.style.setProperty("left", "0");
      setTimeout(() => setIsResetting(false), 300);
    }
  }

  return (
    <>
      <aside
        ref={sidebarRef}
        className={cn("group/sidebar h-screen bg-blue-50 overflow-y-auto relative flex w-60 flex-col z-[99999]",
          isResetting && "transition-all ease-in-out duration-300",
          isMobile && "w-0"
        )}
      >
        <div 
          role="button"
          onClick={collapse}
          className={cn("h-6 w-6 text-muted-foreground rounded-sm hover:bg-blue-200 absolute top-3 right-2 opacity-0 group-hover/sidebar:opacity-100 transition",
            isMobile && "opacity-100"
          )}  
        >
          <LuChevronsLeft className="h-6 w-6 text-blue-600"/> 
        </div>
        <div>
          <UserItem />
        </div>
        <div className="mt-4">
          <p>Projects</p>
        </div>
        <div
          onMouseDown={handleMouseDown}
          onClick={resetWidth}
          className="opacity-0 group-hover/sidebar:opacity-100 transition cursor-ew-resize absolute h-full w-1 bg-purple-100 right-0 top-0"
        />
      </aside>
      <div 
        ref={navbarRef}
        className={cn("absolute top-0 z-[99999] left-60 w-[calc(100% - 240px)]",
          isResetting && "transition-all ease-in-out duration-300",
          isMobile && "left-0 w-full"
        )}
      >
        <nav className="bg-transparent px-3 py-2 w-full">
          {isCollapsed && <IoMenu onClick={resetWidth} className="h-6 w-6 text-muted-foreground cursor-pointer" />}
        </nav>
      </div>
    </>
  )
}

export default Navigation