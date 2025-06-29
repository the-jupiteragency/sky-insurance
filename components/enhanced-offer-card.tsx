"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Info, CheckCircle, Star, Clock, Phone, Calculator, Shield, FileText } from "lucide-react"
import { cn } from "@/lib/utils"
import type { InsuranceOffer } from "@/lib/insurance-calculator"

interface EnhancedOfferCardProps {
  offer: InsuranceOffer
  language: "en" | "ar"
  isSelected: boolean
  onSelect: () => void
  rank?: number
  carInfo?: {
    make: string
    model: string
    year: number
    market_price: number
    condition: string
    fuel_type: string
  }
}

export function EnhancedOfferCard({ offer, language, isSelected, onSelect, rank, carInfo }: EnhancedOfferCardProps) {
  const isRTL = language === "ar"
  const isBestOffer = rank === 1

  const getDetailedTooltipContent = () => {
    const monthlyPremium = Math.round(offer.annualPremium / 12)
    const dailyCost = Math.round(offer.annualPremium / 365)
    const coveragePercentage = ((offer.annualPremium / (carInfo?.market_price || 1)) * 100).toFixed(2)

    return (
      <div className="space-y-4 w-full p-4">
        {/* Premium Breakdown */}
        <div className="bg-blue-50 p-3 rounded-lg">
          <h4 className={cn("font-semibold text-blue-900 mb-2 flex items-center gap-1", isRTL && "flex-row-reverse")}>
            <Calculator className="h-3 w-3" />
            <span className={isRTL ? "text-right" : ""}>
              {language === "en" ? "Premium Breakdown" : "تفاصيل القسط"}
            </span>
          </h4>
          <div className="space-y-1 text-xs text-blue-800">
            <div className={cn("flex justify-between", isRTL && "flex-row-reverse")}>
              <span className={isRTL ? "text-right" : ""}>{language === "en" ? "Annual:" : "سنوياً:"}</span>
              <span className="font-semibold">{offer.annualPremium.toLocaleString()} EGP</span>
            </div>
            <div className={cn("flex justify-between", isRTL && "flex-row-reverse")}>
              <span className={isRTL ? "text-right" : ""}>{language === "en" ? "Monthly:" : "شهرياً:"}</span>
              <span>{monthlyPremium.toLocaleString()} EGP</span>
            </div>
            <div className={cn("flex justify-between", isRTL && "flex-row-reverse")}>
              <span className={isRTL ? "text-right" : ""}>{language === "en" ? "Daily:" : "يومياً:"}</span>
              <span>{dailyCost} EGP</span>
            </div>
            <div className={cn("flex justify-between border-t pt-1", isRTL && "flex-row-reverse")}>
              <span className={isRTL ? "text-right" : ""}>{language === "en" ? "Rate:" : "المعدل:"}</span>
              <span className="font-semibold">{(offer.premiumRate * 100).toFixed(2)}%</span>
            </div>
          </div>
        </div>

        {/* Coverage Details */}
        <div className="bg-green-50 p-3 rounded-lg">
          <h4 className={cn("font-semibold text-green-900 mb-2 flex items-center gap-1", isRTL && "flex-row-reverse")}>
            <Shield className="h-3 w-3" />
            <span className={isRTL ? "text-right" : ""}>
              {language === "en" ? "Coverage Details" : "تفاصيل التغطية"}
            </span>
          </h4>
          <div className="space-y-1 text-xs text-green-800">
            <div className={cn("flex justify-between", isRTL && "flex-row-reverse")}>
              <span className={isRTL ? "text-right" : ""}>{language === "en" ? "Policy Type:" : "نوع الوثيقة:"}</span>
              <span className={cn("font-semibold", isRTL && "text-right")}>{offer.policyType}</span>
            </div>
            <div className={cn("flex justify-between", isRTL && "flex-row-reverse")}>
              <span className={isRTL ? "text-right" : ""}>{language === "en" ? "Deductible:" : "التحمل:"}</span>
              <span className={isRTL ? "text-right" : ""}>{offer.deductible}</span>
            </div>
            {carInfo && (
              <div className={cn("flex justify-between", isRTL && "flex-row-reverse")}>
                <span className={isRTL ? "text-right" : ""}>
                  {language === "en" ? "Vehicle Value:" : "قيمة السيارة:"}
                </span>
                <span>{carInfo.market_price.toLocaleString()} EGP</span>
              </div>
            )}
            <div className={cn("flex justify-between border-t pt-1", isRTL && "flex-row-reverse")}>
              <span className={isRTL ? "text-right" : ""}>{language === "en" ? "Coverage %:" : "نسبة التغطية:"}</span>
              <span className="font-semibold">{coveragePercentage}%</span>
            </div>
          </div>
        </div>

        {/* Key Features */}
        <div className="bg-yellow-50 p-3 rounded-lg">
          <h4 className={cn("font-semibold text-yellow-900 mb-2 flex items-center gap-1", isRTL && "flex-row-reverse")}>
            <Star className="h-3 w-3" />
            <span className={isRTL ? "text-right" : ""}>{language === "en" ? "Key Benefits" : "المزايا الرئيسية"}</span>
          </h4>
          <ul className="text-xs text-yellow-800 space-y-1">
            {offer.features[language].slice(0, 4).map((feature, index) => (
              <li key={index} className={cn("flex items-start gap-1", isRTL && "flex-row-reverse")}>
                <CheckCircle className={cn("h-2 w-2 text-green-600 mt-0.5 flex-shrink-0", isRTL && "order-last")} />
                <span className={isRTL ? "text-right" : ""}>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Important Terms */}
        <div className="bg-orange-50 p-3 rounded-lg">
          <h4 className={cn("font-semibold text-orange-900 mb-2 flex items-center gap-1", isRTL && "flex-row-reverse")}>
            <FileText className="h-3 w-3" />
            <span className={isRTL ? "text-right" : ""}>{language === "en" ? "Important Terms" : "الشروط المهمة"}</span>
          </h4>
          <ul className="text-xs text-orange-800 space-y-1">
            {offer.conditions[language].slice(0, 3).map((condition, index) => (
              <li key={index} className={cn("flex items-start gap-1", isRTL && "flex-row-reverse")}>
                <Info className={cn("h-2 w-2 text-blue-600 mt-0.5 flex-shrink-0", isRTL && "order-last")} />
                <span className={isRTL ? "text-right" : ""}>{condition}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Company Info */}
        <div className="bg-gray-50 p-3 rounded-lg">
          <h4 className={cn("font-semibold text-gray-900 mb-2", isRTL && "text-right")}>
            {language === "en" ? "About " + offer.company : "حول " + offer.company}
          </h4>
          <p className={cn("text-xs text-gray-700", isRTL && "text-right")}>
            {language === "en"
              ? `${offer.company} is a leading insurance provider in Egypt, offering comprehensive coverage with excellent customer service and competitive rates.`
              : `${offer.company} هي شركة تأمين رائدة في مصر، تقدم تغطية شاملة مع خدمة عملاء ممتازة وأسعار تنافسية.`}
          </p>
        </div>

        {/* Action Recommendation */}
        {isBestOffer && (
          <div className="bg-green-100 p-3 rounded-lg border border-green-300">
            <p className={cn("text-xs text-green-800 font-semibold text-center", isRTL && "text-right")}>
              {language === "en" ? "🏆 Recommended: Best value for your vehicle!" : "🏆 موصى به: أفضل قيمة لسيارتك!"}
            </p>
          </div>
        )}
      </div>
    )
  }

  return (
    <TooltipProvider delayDuration={300}>
      <Card
        className={cn(
          "relative transition-all duration-300 hover:shadow-lg",
          isSelected ? "ring-2 ring-blue-500 shadow-lg scale-[1.02]" : "hover:shadow-md hover:scale-[1.01]",
          isBestOffer ? "border-green-500 bg-gradient-to-br from-green-50 to-blue-50" : "",
        )}
      >
        {/* Best Offer Badge */}
        {isBestOffer && (
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
            <Badge className="bg-green-500 text-white px-3 py-1 text-xs font-semibold flex items-center gap-1">
              <Star className="h-3 w-3" />
              <span>{language === "en" ? "Best Offer" : "أفضل عرض"}</span>
            </Badge>
          </div>
        )}

        {/* Selected Badge */}
        {isSelected && (
          <div className="absolute -top-2 -right-2 z-10 bg-blue-500 text-white rounded-full p-2">
            <CheckCircle className="h-4 w-4" />
          </div>
        )}

        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-20 h-12 bg-white rounded-lg flex items-center justify-center border shadow-sm overflow-hidden">
                <img
                  src={offer.logo || "/placeholder.svg"}
                  alt={`${offer.company} logo`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.style.display = "none"
                    const parent = target.parentElement
                    if (parent) {
                      parent.style.backgroundColor = offer.companyColor
                      parent.innerHTML = `<span class="text-white font-bold text-xs">${offer.company.charAt(0)}</span>`
                    }
                  }}
                />
              </div>
              <div>
                <CardTitle className="text-lg font-bold">{offer.company}</CardTitle>
                <p className="text-sm text-muted-foreground">{offer.policyType}</p>
              </div>
            </div>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-blue-100" type="button">
                    <Info className="h-4 w-4 text-blue-600" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="left" className="max-w-sm max-h-96 overflow-y-auto">
                  <div className="p-3 space-y-3">
                    <div className="bg-blue-50 p-2 rounded">
                      <h4 className={`font-semibold text-blue-900 text-sm mb-1 ${isRTL ? "text-right" : ""}`}>
                        {language === "en" ? "Premium Details" : "تفاصيل القسط"}
                      </h4>
                      <div className="text-xs text-blue-800 space-y-1">
                        <div className={`flex justify-between ${isRTL ? "flex-row-reverse" : ""}`}>
                          <span>{language === "en" ? "Annual:" : "سنوياً:"}</span>
                          <span className="font-semibold">{offer.annualPremium.toLocaleString()} EGP</span>
                        </div>
                        <div className={`flex justify-between ${isRTL ? "flex-row-reverse" : ""}`}>
                          <span>{language === "en" ? "Monthly:" : "شهرياً:"}</span>
                          <span>{Math.round(offer.annualPremium / 12).toLocaleString()} EGP</span>
                        </div>
                        <div className={`flex justify-between ${isRTL ? "flex-row-reverse" : ""}`}>
                          <span>{language === "en" ? "Rate:" : "المعدل:"}</span>
                          <span>{(offer.premiumRate * 100).toFixed(2)}%</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-green-50 p-2 rounded">
                      <h4 className={`font-semibold text-green-900 text-sm mb-1 ${isRTL ? "text-right" : ""}`}>
                        {language === "en" ? "Key Features" : "المزايا الرئيسية"}
                      </h4>
                      <ul className="text-xs text-green-800 space-y-1">
                        {offer.features[language].slice(0, 3).map((feature, index) => (
                          <li key={index} className={`flex items-start gap-1 ${isRTL ? "flex-row-reverse" : ""}`}>
                            <CheckCircle className="h-2 w-2 text-green-600 mt-0.5 flex-shrink-0" />
                            <span className={isRTL ? "text-right" : ""}>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-orange-50 p-2 rounded">
                      <h4 className={`font-semibold text-orange-900 text-sm mb-1 ${isRTL ? "text-right" : ""}`}>
                        {language === "en" ? "Important Terms" : "الشروط المهمة"}
                      </h4>
                      <ul className="text-xs text-orange-800 space-y-1">
                        {offer.conditions[language].slice(0, 2).map((condition, index) => (
                          <li key={index} className={`flex items-start gap-1 ${isRTL ? "flex-row-reverse" : ""}`}>
                            <Info className="h-2 w-2 text-blue-600 mt-0.5 flex-shrink-0" />
                            <span className={isRTL ? "text-right" : ""}>{condition}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Price Section */}
          <div className="text-center bg-white rounded-lg p-4 border">
            <div className="text-3xl font-bold text-blue-600 mb-1 flex items-center justify-center gap-1">
              <span>{offer.annualPremium.toLocaleString()}</span>
              <span className="text-lg font-normal text-muted-foreground">{language === "en" ? "EGP" : "جنيه"}</span>
            </div>
            <p className="text-sm text-muted-foreground">{language === "en" ? "per year" : "سنوياً"}</p>
            <div className="flex justify-center gap-2 mt-2 flex-wrap">
              <Badge variant="secondary" className="text-xs">
                {(offer.premiumRate * 100).toFixed(2)}% {language === "en" ? "rate" : "معدل"}
              </Badge>
              <Badge variant="outline" className="text-xs">
                {Math.round(offer.annualPremium / 12).toLocaleString()} {language === "en" ? "EGP/month" : "جنيه/شهر"}
              </Badge>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <h4 className="font-semibold text-sm flex items-center gap-1">
                <CheckCircle className="h-3 w-3 text-green-500" />
                <span>{language === "en" ? "Key Features" : "المزايا الرئيسية"}</span>
              </h4>
              <ul className="space-y-1">
                {offer.features[language].slice(0, 4).map((feature, index) => (
                  <li key={index} className="text-xs text-muted-foreground flex items-start gap-1">
                    <span className="text-green-500 mt-0.5">•</span>
                    <span className={isRTL ? "text-right" : ""}>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold text-sm flex items-center gap-1">
                <Info className="h-3 w-3 text-blue-500" />
                <span>{language === "en" ? "Important Terms" : "الشروط المهمة"}</span>
              </h4>
              <ul className="space-y-1">
                {offer.conditions[language].slice(0, 3).map((condition, index) => (
                  <li key={index} className="text-xs text-muted-foreground flex items-start gap-1">
                    <span className="text-blue-500 mt-0.5">•</span>
                    <span className={isRTL ? "text-right" : ""}>{condition}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2">
            <Button onClick={onSelect} className="w-full" variant={isSelected ? "default" : "outline"} size="lg">
              {isSelected
                ? language === "en"
                  ? "✓ Selected"
                  : "✓ محدد"
                : language === "en"
                  ? "Select This Offer"
                  : "اختر هذا العرض"}
            </Button>

            <div className="flex gap-2">
              <Button variant="ghost" size="sm" className="flex-1 text-xs flex items-center gap-1">
                <Phone className="h-3 w-3" />
                <span>{language === "en" ? "Call" : "اتصل"}</span>
              </Button>
              <Button variant="ghost" size="sm" className="flex-1 text-xs flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>{language === "en" ? "Details" : "التفاصيل"}</span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </TooltipProvider>
  )
}
