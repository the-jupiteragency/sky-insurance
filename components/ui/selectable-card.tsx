"use client"

import type * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Check } from "lucide-react"

export interface SelectableCardProps {
  children: React.ReactNode
  selected?: boolean
  onSelect?: () => void
  disabled?: boolean
  className?: string
  icon?: React.ReactNode
  title?: string
  description?: string
}

export function SelectableCard({
  children,
  selected = false,
  onSelect,
  disabled = false,
  className,
  icon,
  title,
  description,
}: SelectableCardProps) {
  return (
    <Card
      className={cn(
        "relative cursor-pointer transition-all duration-200 hover:shadow-md",
        selected && "ring-2 ring-blue-500 bg-blue-50 border-blue-200",
        disabled && "opacity-50 cursor-not-allowed",
        className,
      )}
      onClick={disabled ? undefined : onSelect}
    >
      {selected && (
        <div className="absolute -top-2 -right-2 bg-blue-500 text-white rounded-full p-1 z-10">
          <Check className="h-3 w-3" />
        </div>
      )}

      <CardContent className="p-4">
        {icon || title || description ? (
          <div className="space-y-2">
            {icon && <div className="flex justify-center">{icon}</div>}
            {title && <h3 className="font-semibold text-center">{title}</h3>}
            {description && <p className="text-sm text-muted-foreground text-center">{description}</p>}
            {children}
          </div>
        ) : (
          children
        )}
      </CardContent>
    </Card>
  )
}
