"use client"

import * as React from "react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

export interface NumericInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  value?: number
  onChange?: (value: number | undefined) => void
  min?: number
  max?: number
  step?: number
  allowDecimals?: boolean
  prefix?: string
  suffix?: string
}

const NumericInput = React.forwardRef<HTMLInputElement, NumericInputProps>(
  ({ className, value, onChange, min, max, step = 1, allowDecimals = false, prefix, suffix, ...props }, ref) => {
    const [displayValue, setDisplayValue] = React.useState(value?.toString() || "")

    React.useEffect(() => {
      setDisplayValue(value?.toString() || "")
    }, [value])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      let inputValue = e.target.value

      // Remove prefix and suffix for processing
      if (prefix) inputValue = inputValue.replace(prefix, "")
      if (suffix) inputValue = inputValue.replace(suffix, "")

      // Remove any non-numeric characters except decimal point
      if (allowDecimals) {
        inputValue = inputValue.replace(/[^0-9.]/g, "")
        // Ensure only one decimal point
        const parts = inputValue.split(".")
        if (parts.length > 2) {
          inputValue = parts[0] + "." + parts.slice(1).join("")
        }
      } else {
        inputValue = inputValue.replace(/[^0-9]/g, "")
      }

      setDisplayValue(inputValue)

      // Convert to number and validate
      const numericValue = inputValue === "" ? undefined : Number(inputValue)

      if (numericValue !== undefined) {
        if (min !== undefined && numericValue < min) return
        if (max !== undefined && numericValue > max) return
      }

      onChange?.(numericValue)
    }

    const handleBlur = () => {
      if (value !== undefined) {
        let formattedValue = value.toString()
        if (prefix || suffix) {
          formattedValue = `${prefix || ""}${formattedValue}${suffix || ""}`
        }
        setDisplayValue(formattedValue)
      }
    }

    const handleFocus = () => {
      setDisplayValue(value?.toString() || "")
    }

    return (
      <Input
        {...props}
        ref={ref}
        type="text"
        inputMode="numeric"
        value={displayValue}
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        className={cn(className)}
      />
    )
  },
)
NumericInput.displayName = "NumericInput"

export { NumericInput }
