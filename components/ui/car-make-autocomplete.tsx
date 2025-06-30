"use client";

import type React from "react";

import { useState, useCallback, useEffect } from "react";
import { useDebounce } from "../../hooks/use-debounce";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { getAllMakes, getBrandInfo } from "@/lib/car-data";

// Simulated API call for car makes
const fetchCarMakes = async (
  query: string,
  fuelType: "fuel" | "electric"
): Promise<string[]> => {
  await new Promise((resolve) => setTimeout(resolve, 200)); // Simulate network delay

  const allMakes = getAllMakes(fuelType);
  return allMakes.filter((make) =>
    make.toLowerCase().includes(query.toLowerCase())
  );
};

interface CarMakeAutocompleteProps {
  value?: string;
  onChange?: (value: string) => void;
  onCustomMakeSelect?: () => void;
  fuelType: "fuel" | "electric";
  placeholder?: string;
  isRTL?: boolean;
  className?: string;
}

export default function CarMakeAutocomplete({
  value = "",
  onChange,
  onCustomMakeSelect,
  fuelType,
  placeholder = "Search for car brand...",
  isRTL = false,
  className,
}: CarMakeAutocompleteProps) {
  const [query, setQuery] = useState(value);
  const [debouncedQuery] = useDebounce(query, 300);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const fetchSuggestionsCallback = useCallback(
    async (q: string) => {
      setIsLoading(true);

      // Show all brands if query is empty, otherwise filter
      const allMakes = getAllMakes(fuelType);
      const results =
        q.trim() === ""
          ? allMakes
          : allMakes.filter((make) =>
              make.toLowerCase().includes(q.toLowerCase())
            );

      setSuggestions(results);
      setIsLoading(false);
    },
    [fuelType]
  );

  useEffect(() => {
    if (isFocused) {
      fetchSuggestionsCallback(debouncedQuery);
    } else {
      setSuggestions([]);
    }
  }, [debouncedQuery, fetchSuggestionsCallback, isFocused]);

  // Update query when value prop changes
  useEffect(() => {
    setQuery(value);
  }, [value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setQuery(newValue);
    onChange?.(newValue);
    setSelectedIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const totalOptions = suggestions.length + 1; // +1 for "Other" option

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < totalOptions - 1 ? prev + 1 : prev));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === "Enter" && selectedIndex >= 0) {
      e.preventDefault();
      if (selectedIndex < suggestions.length) {
        // Regular brand selected
        const selectedMake = suggestions[selectedIndex];
        setQuery(selectedMake);
        onChange?.(selectedMake);
      } else {
        // "Other" option selected
        onCustomMakeSelect?.();
      }
      setSuggestions([]);
      setSelectedIndex(-1);
    } else if (e.key === "Escape") {
      setSuggestions([]);
      setSelectedIndex(-1);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    onChange?.(suggestion);
    setSuggestions([]);
    setSelectedIndex(-1);
  };

  const handleOtherClick = () => {
    onCustomMakeSelect?.();
    setSuggestions([]);
    setSelectedIndex(-1);
  };

  const handleFocus = () => {
    setIsFocused(true);
    // Always show suggestions on focus, starting with all brands
    fetchSuggestionsCallback(query);
  };

  const handleBlur = () => {
    // Delay hiding suggestions to allow for click events on suggestions
    setTimeout(() => {
      setIsFocused(false);
      setSuggestions([]);
      setSelectedIndex(-1);
    }, 200);
  };

  const showSuggestions = suggestions.length > 0 && !isLoading && isFocused;

  return (
    <div className={cn("w-full relative", className)}>
      <div className="relative">
        <Input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={cn(
            "h-12 text-base pr-10",
            isRTL && "text-right pl-10 pr-4"
          )}
          dir={isRTL ? "rtl" : "ltr"}
          aria-label="Search car brand"
          aria-autocomplete="list"
          aria-controls="car-makes-list"
          aria-expanded={showSuggestions}
        />
        <Button
          size="icon"
          variant="ghost"
          className={cn("absolute top-0 h-full", isRTL ? "left-0" : "right-0")}
          aria-label="Search"
          tabIndex={-1}
        >
          <Search className="h-4 w-4" />
        </Button>
      </div>

      {isLoading && isFocused && (
        <div
          className={cn(
            "mt-2 p-3 bg-background border rounded-md shadow-lg absolute z-50 w-full",
            isRTL && "text-right"
          )}
          aria-live="polite"
        >
          {isRTL ? "جاري البحث..." : "Loading..."}
        </div>
      )}

      {showSuggestions && (
        <ul
          id="car-makes-list"
          className="mt-2 bg-background border rounded-md shadow-lg absolute z-50 w-full max-h-60 overflow-y-auto"
          role="listbox"
        >
          {suggestions.map((make, index) => {
            const brandInfo = getBrandInfo(make);
            const isSelected = index === selectedIndex;
            const isCurrentValue = make === value;

            return (
              <li
                key={make}
                className={cn(
                  "px-4 py-3 cursor-pointer hover:bg-accent transition-colors",
                  isSelected && "bg-accent",
                  "border-b border-border last:border-b-0"
                )}
                onClick={() => handleSuggestionClick(make)}
                role="option"
                aria-selected={isSelected}
              >
                <div
                  className={cn(
                    "flex items-center gap-3",
                    isRTL && "flex-row-reverse"
                  )}
                >
                  <Check
                    className={cn(
                      "h-4 w-4",
                      isCurrentValue ? "opacity-100 text-primary" : "opacity-0"
                    )}
                  />
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold">{make.charAt(0)}</span>
                  </div>
                  <div className={cn("flex-1", isRTL && "text-right")}>
                    <div className="font-medium">{make}</div>
                    {brandInfo && (
                      <div className="text-xs text-muted-foreground">
                        {brandInfo.country} • {brandInfo.category}
                      </div>
                    )}
                  </div>
                </div>
              </li>
            );
          })}

          {/* Other option */}
          <li
            className={cn(
              "px-4 py-3 cursor-pointer hover:bg-accent transition-colors",
              selectedIndex === suggestions.length && "bg-accent",
              "border-t border-border"
            )}
            onClick={handleOtherClick}
            role="option"
            aria-selected={selectedIndex === suggestions.length}
          >
            <div
              className={cn(
                "flex items-center gap-3",
                isRTL && "flex-row-reverse"
              )}
            >
              <Check className="h-4 w-4 opacity-0" />
              <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                <span className="text-xs font-bold text-orange-600">?</span>
              </div>
              <div className={cn("flex-1", isRTL && "text-right")}>
                <div className="font-medium">{isRTL ? "أخرى" : "Other"}</div>
                <div className="text-xs text-muted-foreground">
                  {isRTL ? "ماركة غير مدرجة" : "Brand not listed"}
                </div>
              </div>
            </div>
          </li>
        </ul>
      )}
    </div>
  );
}
