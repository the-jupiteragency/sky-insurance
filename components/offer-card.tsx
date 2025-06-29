"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Info, CheckCircle } from "lucide-react"
import type { InsuranceOffer } from "@/lib/insurance-calculator"

interface OfferCardProps {
  offer: InsuranceOffer
  language: "en" | "ar"
  isSelected: boolean
  onSelect: () => void
}

export function OfferCard({ offer, language, isSelected, onSelect }: OfferCardProps) {
  const isRTL = language === "ar"

  return (
    <Card
      className={`relative transition-all duration-200 ${isSelected ? "ring-2 ring-blue-500 shadow-lg" : "hover:shadow-md"}`}
    >
      {isSelected && (
        <div className="absolute -top-2 -right-2 bg-blue-500 text-white rounded-full p-1">
          <CheckCircle className="h-4 w-4" />
        </div>
      )}

      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={offer.logo || "/placeholder.svg"}
              alt={`${offer.company} logo`}
              className="h-12 w-auto object-contain"
            />
            <div>
              <CardTitle className="text-lg">{offer.company}</CardTitle>
              <p className="text-sm text-muted-foreground">{offer.policyType}</p>
            </div>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <Info className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="left" className="max-w-xs">
                <div className={`space-y-2 ${isRTL ? "text-right" : "text-left"}`}>
                  <p className="font-semibold">{language === "en" ? "Policy Details" : "تفاصيل الوثيقة"}</p>
                  <p className="text-sm">
                    {language === "en"
                      ? `Premium Rate: ${(offer.premiumRate * 100).toFixed(2)}%`
                      : `معدل القسط: ${(offer.premiumRate * 100).toFixed(2)}%`}
                  </p>
                  <p className="text-sm">
                    {language === "en" ? `Deductible: ${offer.deductible}` : `التحمل: ${offer.deductible}`}
                  </p>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="text-center">
          <div className="text-3xl font-bold text-blue-600">
            {offer.annualPremium.toLocaleString()}
            <span className="text-lg font-normal text-muted-foreground ml-1">
              {language === "en" ? "EGP/year" : "جنيه/سنة"}
            </span>
          </div>
          <Badge variant="secondary" className="mt-2">
            {(offer.premiumRate * 100).toFixed(2)}% {language === "en" ? "Premium Rate" : "معدل القسط"}
          </Badge>
        </div>

        <div className={`space-y-3 ${isRTL ? "text-right" : "text-left"}`}>
          <div>
            <h4 className="font-semibold text-sm mb-2">{language === "en" ? "Features" : "المزايا"}</h4>
            <ul className="space-y-1">
              {offer.features[language].map((feature, index) => (
                <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                  <CheckCircle className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-2">{language === "en" ? "Conditions" : "الشروط"}</h4>
            <ul className="space-y-1">
              {offer.conditions[language].map((condition, index) => (
                <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                  <Info className="h-3 w-3 text-blue-500 mt-0.5 flex-shrink-0" />
                  <span>{condition}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Button onClick={onSelect} className="w-full" variant={isSelected ? "default" : "outline"}>
          {isSelected
            ? language === "en"
              ? "Selected"
              : "محدد"
            : language === "en"
              ? "Select This Offer"
              : "اختر هذا العرض"}
        </Button>
      </CardContent>
    </Card>
  )
}
