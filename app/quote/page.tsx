"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowLeft,
  ArrowRight,
  Car,
  User,
  FileText,
  Gift,
  CheckCircle,
  TrendingUp,
  Search,
  AlertCircle,
} from "lucide-react";
import { calculateInsuranceOffers } from "@/lib/insurance-calculator";
import { carInfoSchema, userInfoSchema, type CarInfo } from "@/lib/validations";
import { useToast } from "@/hooks/use-toast";
import { FileUpload } from "@/components/file-upload";
import { EnhancedOfferCard } from "@/components/enhanced-offer-card";
import { LanguageSwitcher } from "@/components/language-switcher";
import { NumericInput } from "@/components/ui/numeric-input";
import { SelectableCard } from "@/components/ui/selectable-card";
import { useQuoteState } from "@/hooks/use-quote-state";
import { cn } from "@/lib/utils";
import {
  getAllMakes,
  getModelsByMake,
  getBrandInfo,
  getManufacturingYears,
  formatPrice,
  getCategoryIcon,
  getPopularBrands,
} from "@/lib/car-data";

type Step = "car-info" | "user-info" | "documents" | "offers" | "thank-you";

export default function QuotePage() {
  const {
    state,
    updateCarInfo,
    updateUserInfo,
    updateDocuments,
    setCurrentStep,
    setErrors,
    canNavigateToStep,
    updateState,
    markAsSubmitted,
  } = useQuoteState();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [makeSearchTerm, setMakeSearchTerm] = useState("");

  const { toast } = useToast();

  const isRTL = state.language === "ar";

  const steps: { key: Step; title: string; description: string; icon: any }[] =
    [
      {
        key: "car-info",
        title: isRTL ? "تفاصيل السيارة" : "Vehicle Details",
        description: isRTL ? "أخبرنا عن سيارتك" : "Tell us about your car",
        icon: Car,
      },
      {
        key: "user-info",
        title: isRTL ? "المعلومات الشخصية" : "Personal Info",
        description: isRTL ? "بياناتك الشخصية" : "Your contact details",
        icon: User,
      },
      {
        key: "documents",
        title: isRTL ? "المستندات" : "Documents",
        description: isRTL ? "رفع الملفات المطلوبة" : "Upload required files",
        icon: FileText,
      },
      {
        key: "offers",
        title: isRTL ? "عروض التأمين" : "Insurance Offers",
        description: isRTL ? "اختر خطتك" : "Choose your plan",
        icon: Gift,
      },
      {
        key: "thank-you",
        title: isRTL ? "مكتمل" : "Complete",
        description: isRTL ? "تم الانتهاء!" : "All done!",
        icon: CheckCircle,
      },
    ];

  const currentStepIndex = steps.findIndex(
    (step) => step.key === state.currentStep
  );
  const progress = ((currentStepIndex + 1) / steps.length) * 100;

  // Get filtered models based on selected make
  const availableModels = state.carInfo.make
    ? getModelsByMake(state.carInfo.make)
    : [];
  const selectedModel = availableModels.find(
    (model) => model.name === state.carInfo.model
  );

  // Filter makes based on search term
  const filteredMakes = getAllMakes().filter((make) =>
    make.toLowerCase().includes(makeSearchTerm.toLowerCase())
  );

  // Auto-suggest price based on selected model
  useEffect(() => {
    if (selectedModel && !state.carInfo.market_price) {
      const suggestedPrice = Math.round(
        (selectedModel.priceRange.min + selectedModel.priceRange.max) / 2
      );
      updateCarInfo({ market_price: suggestedPrice });
    }
  }, [selectedModel, state.carInfo.market_price, updateCarInfo]);

  const validateCarInfo = () => {
    try {
      carInfoSchema.parse(state.carInfo);
      setErrors({});
      return true;
    } catch (error: any) {
      const fieldErrors: Record<string, string> = {};
      error.errors?.forEach((err: any) => {
        fieldErrors[err.path[0]] = err.message;
      });
      setErrors(fieldErrors);
      return false;
    }
  };

  const validateUserInfo = () => {
    try {
      userInfoSchema.parse(state.userInfo);
      setErrors({});
      return true;
    } catch (error: any) {
      const fieldErrors: Record<string, string> = {};
      error.errors?.forEach((err: any) => {
        fieldErrors[err.path[0]] = err.message;
      });
      setErrors(fieldErrors);
      return false;
    }
  };

  const validateDocuments = () => {
    const requiredDocs = [
      "personal_id_front",
      "personal_id_back",
      "license_front",
      "license_back",
    ];
    const missingDocs = requiredDocs.filter(
      (doc) => !state.documents[doc as keyof typeof state.documents]
    );

    if (missingDocs.length > 0) {
      const fieldErrors: Record<string, string> = {};
      missingDocs.forEach((doc) => {
        fieldErrors[doc] = "This document is required";
      });
      setErrors(fieldErrors);
      return false;
    }

    setErrors({});
    return true;
  };

  const handleStepClick = (targetStep: Step) => {
    // Prevent navigation to thank-you step unless coming from successful submission
    if (targetStep === "thank-you" && state.currentStep !== "thank-you") {
      toast({
        title: isRTL
          ? "لا يمكن الانتقال إلى هذه الخطوة"
          : "Cannot navigate to this step",
        description: isRTL
          ? "يجب إرسال الطلب أولاً من صفحة العروض."
          : "You must submit your quote from the offers page first.",
        variant: "destructive",
      });
      return;
    }

    if (!canNavigateToStep(targetStep)) {
      toast({
        title: isRTL
          ? "لا يمكن الانتقال إلى هذه الخطوة"
          : "Cannot navigate to this step",
        description: isRTL
          ? "يرجى إكمال الخطوة الحالية أولاً."
          : "Please complete the current step first.",
        variant: "destructive",
      });
      return;
    }

    // Validate current step before moving
    if (targetStep !== state.currentStep) {
      let canProceed = true;

      switch (state.currentStep) {
        case "car-info":
          if (targetStep !== "car-info") {
            canProceed = validateCarInfo();
          }
          break;
        case "user-info":
          if (targetStep !== "car-info" && targetStep !== "user-info") {
            canProceed = validateUserInfo();
          }
          break;
        case "documents":
          if (targetStep === "offers") {
            canProceed = validateDocuments();
          }
          break;
        case "offers":
          // From offers, can only go back or submit (not skip to thank-you)
          if (targetStep === "thank-you") {
            toast({
              title: isRTL ? "يجب إرسال الطلب" : "Must submit quote",
              description: isRTL
                ? "يرجى اختيار عرض وإرسال الطلب."
                : "Please select an offer and submit your quote.",
              variant: "destructive",
            });
            return;
          }
          break;
      }

      if (!canProceed) {
        toast({
          title: isRTL ? "يرجى إصلاح الأخطاء" : "Please fix the errors",
          description: isRTL
            ? "أكمل الخطوة الحالية قبل المتابعة."
            : "Complete the current step before proceeding.",
          variant: "destructive",
        });
        return;
      }
    }

    setCurrentStep(targetStep);
  };

  const handleNext = () => {
    if (state.currentStep === "car-info") {
      if (validateCarInfo()) {
        const calculatedOffers = calculateInsuranceOffers(
          state.carInfo as CarInfo
        );
        updateState({ offers: calculatedOffers });
        setCurrentStep("user-info");
      }
    } else if (state.currentStep === "user-info") {
      if (validateUserInfo()) {
        setCurrentStep("documents");
      }
    } else if (state.currentStep === "documents") {
      if (validateDocuments()) {
        setCurrentStep("offers");
      }
    }
  };

  const handleBack = () => {
    const stepOrder: Step[] = ["car-info", "user-info", "documents", "offers"];
    const currentIndex = stepOrder.indexOf(state.currentStep);
    if (currentIndex > 0) {
      setCurrentStep(stepOrder[currentIndex - 1]);
    }
  };

  const uploadFile = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Upload failed");
    }

    const result = await response.json();
    return result.url;
  };

  const handleSubmit = async () => {
    if (!state.selectedOffer) {
      toast({
        title: isRTL ? "يرجى اختيار عرض" : "Please select an offer",
        description: isRTL
          ? "يجب اختيار عرض تأمين للمتابعة."
          : "You must choose an insurance offer to continue.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Upload all documents
      const documentUrls: Record<string, string> = {};
      for (const [key, file] of Object.entries(state.documents)) {
        if (file) {
          documentUrls[key] = await uploadFile(file);
        }
      }

      // Submit the quote
      const response = await fetch("/api/submit-quote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          carInfo: state.carInfo,
          userInfo: state.userInfo,
          documents: documentUrls,
          selectedOffer: state.selectedOffer,
        }),
      });

      if (!response.ok) {
        throw new Error("Submission failed");
      }

      const result = await response.json();

      toast({
        title: isRTL
          ? "تم إرسال الطلب بنجاح!"
          : "Quote submitted successfully!",
        description:
          result.note ||
          (isRTL ? "سيتم التواصل معك قريباً" : "We will contact you soon"),
      });

      // Mark as submitted and move to thank you page
      markAsSubmitted();
      setCurrentStep("thank-you");
    } catch (error) {
      console.error("Submission error:", error);
      toast({
        title: isRTL ? "فشل في الإرسال" : "Submission failed",
        description: isRTL
          ? "يرجى المحاولة مرة أخرى أو الاتصال بالدعم."
          : "Please try again or contact support.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderCarInfoStep = () => (
    <div className="space-y-8" dir={isRTL ? "rtl" : "ltr"}>
      <Card className="border-2 border-blue-100">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
          <CardTitle
            className={cn(
              "flex items-center gap-3",
              isRTL && "flex-row-reverse"
            )}
          >
            <div className="p-2 bg-blue-500 rounded-lg">
              <Car className="h-6 w-6 text-white" />
            </div>
            {isRTL ? "معلومات السيارة" : "Vehicle Information"}
          </CardTitle>
          <CardDescription className={isRTL ? "text-right" : ""}>
            {isRTL
              ? "يرجى تقديم تفاصيل سيارتك للحصول على عروض أسعار دقيقة"
              : "Please provide details about your car to get accurate quotes"}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-8 space-y-8">
          {/* Popular Brands Quick Selection */}
          <div className="space-y-4">
            <Label
              className={cn("text-base font-semibold", isRTL && "text-right")}
            >
              {isRTL ? "العلامات التجارية الشائعة" : "Popular Brands"}
            </Label>
            <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
              {getPopularBrands()
                .slice(0, 10)
                .map((make) => (
                  <Button
                    key={make}
                    variant={
                      state.carInfo.make === make ? "default" : "outline"
                    }
                    size="sm"
                    onClick={() => updateCarInfo({ make, model: "" })}
                    className="text-xs"
                  >
                    {make}
                  </Button>
                ))}
            </div>
          </div>

          {/* Car Make Selection with Search */}
          <div className="space-y-4">
            <Label
              className={cn("text-base font-semibold", isRTL && "text-right")}
            >
              {isRTL ? "ماركة السيارة *" : "Car Make/Brand *"}
            </Label>
            <div className="relative">
              <Search
                className={cn(
                  "absolute top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground",
                  isRTL ? "right-3" : "left-3"
                )}
              />
              <Input
                placeholder={
                  isRTL ? "ابحث عن ماركة السيارة..." : "Search for car brand..."
                }
                value={makeSearchTerm}
                onChange={(e) => setMakeSearchTerm(e.target.value)}
                className={cn("mb-2", isRTL ? "pr-10 text-right" : "pl-10")}
                dir={isRTL ? "rtl" : "ltr"}
              />
            </div>
            <Select
              value={state.carInfo.make || ""}
              onValueChange={(value) =>
                updateCarInfo({ make: value, model: "" })
              }
            >
              <SelectTrigger className="h-12 text-base">
                <SelectValue
                  placeholder={
                    isRTL ? "اختر ماركة سيارتك" : "Select your car brand"
                  }
                />
              </SelectTrigger>
              <SelectContent className="max-h-60">
                {filteredMakes.map((make) => {
                  const brandInfo = getBrandInfo(make);
                  return (
                    <SelectItem key={make} value={make} className="py-3">
                      <div
                        className={cn(
                          "flex items-center gap-3",
                          isRTL && "flex-row-reverse"
                        )}
                      >
                        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                          <span className="text-xs font-bold">
                            {make.charAt(0)}
                          </span>
                        </div>
                        <div className={isRTL ? "text-right" : ""}>
                          <div className="font-medium">{make}</div>
                          <div className="text-xs text-muted-foreground">
                            {brandInfo?.country} • {brandInfo?.category}
                          </div>
                        </div>
                      </div>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
            {state.errors.make && (
              <p className="text-sm text-red-500">{state.errors.make}</p>
            )}
          </div>

          {/* Car Model Selection */}
          <div className="space-y-4">
            <Label
              className={cn("text-base font-semibold", isRTL && "text-right")}
            >
              {isRTL ? "موديل السيارة *" : "Car Model *"}
            </Label>
            <Select
              value={state.carInfo.model || ""}
              onValueChange={(value) => updateCarInfo({ model: value })}
              disabled={!state.carInfo.make}
            >
              <SelectTrigger className="h-12 text-base">
                <SelectValue
                  placeholder={
                    state.carInfo.make
                      ? isRTL
                        ? "اختر موديل سيارتك"
                        : "Select your car model"
                      : isRTL
                        ? "اختر الماركة أولاً"
                        : "Select brand first"
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {availableModels.map((model) => (
                  <SelectItem
                    key={model.name}
                    value={model.name}
                    className="py-3"
                  >
                    <div
                      className={cn(
                        "flex items-center gap-3",
                        isRTL && "flex-row-reverse"
                      )}
                    >
                      <span className="text-lg">
                        {getCategoryIcon(model.category)}
                      </span>
                      <div className={isRTL ? "text-right" : ""}>
                        <div className="font-medium">{model.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {model.category} • {formatPrice(model.priceRange.min)}{" "}
                          - {formatPrice(model.priceRange.max)} EGP
                        </div>
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {state.errors.model && (
              <p className="text-sm text-red-500">{state.errors.model}</p>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Manufacturing Year */}
            <div className="space-y-4">
              <Label
                className={cn("text-base font-semibold", isRTL && "text-right")}
              >
                {isRTL ? "سنة الصنع *" : "Manufacturing Year *"}
              </Label>
              <Select
                value={state.carInfo.year?.toString() || ""}
                onValueChange={(value) =>
                  updateCarInfo({ year: Number.parseInt(value) })
                }
              >
                <SelectTrigger className="h-12 text-base">
                  <SelectValue
                    placeholder={isRTL ? "اختر السنة" : "Select year"}
                  />
                </SelectTrigger>
                <SelectContent>
                  {getManufacturingYears().map((year) => (
                    <SelectItem key={year} value={year.toString()}>
                      <div
                        className={cn(
                          "flex items-center gap-2",
                          isRTL && "flex-row-reverse"
                        )}
                      >
                        <span>{year}</span>
                        {year >= new Date().getFullYear() - 2 && (
                          <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                            {isRTL ? "جديد" : "New"}
                          </span>
                        )}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {state.errors.year && (
                <p className="text-sm text-red-500">{state.errors.year}</p>
              )}
            </div>

            {/* Market Price */}
            <div className="space-y-4">
              <Label
                className={cn("text-base font-semibold", isRTL && "text-right")}
              >
                {isRTL ? "سعر السوق (جنيه مصري) *" : "Market Price (EGP) *"}
              </Label>
              <div className="relative">
                <NumericInput
                  value={state.carInfo.market_price}
                  onChange={(value) => updateCarInfo({ market_price: value })}
                  min={50000}
                  max={10000000}
                  className={cn(
                    "h-12 text-base",
                    isRTL ? "pr-12 text-right" : "pl-12"
                  )}
                  placeholder={isRTL ? "أدخل سعر السيارة" : "Enter car price"}
                  dir={isRTL ? "rtl" : "ltr"}
                />
                <div
                  className={cn(
                    "absolute top-1/2 transform -translate-y-1/2 text-muted-foreground",
                    isRTL ? "right-3" : "left-3"
                  )}
                >
                  EGP
                </div>
                {selectedModel && (
                  <div
                    className={cn(
                      "absolute top-1/2 transform -translate-y-1/2",
                      isRTL ? "left-3" : "right-3"
                    )}
                  >
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="text-xs"
                      onClick={() => {
                        const suggestedPrice = Math.round(
                          (selectedModel.priceRange.min +
                            selectedModel.priceRange.max) /
                            2
                        );
                        updateCarInfo({ market_price: suggestedPrice });
                      }}
                    >
                      <TrendingUp className="h-3 w-3 mr-1" />
                      {isRTL ? "اقتراح" : "Suggest"}
                    </Button>
                  </div>
                )}
              </div>
              {selectedModel && (
                <p
                  className={cn(
                    "text-xs text-muted-foreground",
                    isRTL && "text-right"
                  )}
                >
                  {isRTL ? "النطاق المعتاد: " : "Typical range: "}
                  {formatPrice(selectedModel.priceRange.min)} -{" "}
                  {formatPrice(selectedModel.priceRange.max)} EGP
                </p>
              )}
              {state.errors.market_price && (
                <p className="text-sm text-red-500">
                  {state.errors.market_price}
                </p>
              )}
            </div>
          </div>

          {/* Car Condition */}
          <div className="space-y-4">
            <Label
              className={cn("text-base font-semibold", isRTL && "text-right")}
            >
              {isRTL ? "حالة السيارة *" : "Car Condition *"}
            </Label>
            <div className="grid grid-cols-2 gap-4">
              <SelectableCard
                selected={state.carInfo.condition === "new"}
                onSelect={() => updateCarInfo({ condition: "new" })}
                icon={<div className="text-2xl">✨</div>}
                title={isRTL ? "سيارة جديدة" : "New Car"}
                description={
                  isRTL
                    ? "0-2 سنة، حالة ممتازة"
                    : "0-2 years old, excellent condition"
                }
                children={undefined}
              />
              <SelectableCard
                selected={state.carInfo.condition === "used"}
                onSelect={() => updateCarInfo({ condition: "used" })}
                icon={<div className="text-2xl">🚗</div>}
                title={isRTL ? "سيارة مستعملة" : "Used Car"}
                description={
                  isRTL ? "سيارة مملوكة مسبقاً" : "Pre-owned vehicle"
                }
                children={undefined}
              />
            </div>
            {state.errors.condition && (
              <p className="text-sm text-red-500">{state.errors.condition}</p>
            )}
          </div>

          {/* Fuel Type */}
          <div className="space-y-4">
            <Label
              className={cn("text-base font-semibold", isRTL && "text-right")}
            >
              {isRTL ? "نوع الوقود *" : "Fuel Type *"}
            </Label>
            <div className="grid grid-cols-2 gap-4">
              <SelectableCard
                selected={state.carInfo.fuel_type === "fuel"}
                onSelect={() => updateCarInfo({ fuel_type: "fuel" })}
                icon={<div className="text-2xl">⛽</div>}
                title={isRTL ? "بنزين" : "Gasoline"}
                description={
                  isRTL ? "محرك وقود تقليدي" : "Traditional fuel engine"
                }
                children={undefined}
              />
              <SelectableCard
                selected={state.carInfo.fuel_type === "electric"}
                onSelect={() => updateCarInfo({ fuel_type: "electric" })}
                icon={<div className="text-2xl">🔋</div>}
                title={isRTL ? "كهربائي" : "Electric"}
                description={
                  isRTL ? "سيارة تعمل بالبطارية" : "Battery-powered vehicle"
                }
                children={undefined}
              />
            </div>
            {state.errors.fuel_type && (
              <p className="text-sm text-red-500">{state.errors.fuel_type}</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderUserInfoStep = () => (
    <Card className="border-2 border-green-100" dir={isRTL ? "rtl" : "ltr"}>
      <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
        <CardTitle
          className={cn("flex items-center gap-3", isRTL && "flex-row-reverse")}
        >
          <div className="p-2 bg-green-500 rounded-lg">
            <User className="h-6 w-6 text-white" />
          </div>
          {isRTL ? "المعلومات الشخصية" : "Personal Information"}
        </CardTitle>
        <CardDescription className={isRTL ? "text-right" : ""}>
          {isRTL
            ? "يرجى تقديم بياناتك الشخصية لعرض التأمين"
            : "Please provide your contact details for the insurance quote"}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-8 space-y-6">
        <div className="space-y-4">
          <Label
            className={cn("text-base font-semibold", isRTL && "text-right")}
          >
            {isRTL
              ? "الاسم الكامل (كما هو في الهوية) *"
              : "Full Name (as on ID) *"}
          </Label>
          <Input
            value={state.userInfo.full_name || ""}
            onChange={(e) => updateUserInfo({ full_name: e.target.value })}
            placeholder={isRTL ? "أدخل اسمك الكامل" : "Enter your full name"}
            className={cn("h-12 text-base", isRTL && "text-right")}
            dir={isRTL ? "rtl" : "ltr"}
          />
          {state.errors.full_name && (
            <p className="text-sm text-red-500">{state.errors.full_name}</p>
          )}
        </div>

        <div className="space-y-4">
          <Label
            className={cn("text-base font-semibold", isRTL && "text-right")}
          >
            {isRTL ? "رقم الهاتف المحمول *" : "Mobile Number *"}
          </Label>
          <Input
            value={state.userInfo.mobile_number || ""}
            onChange={(e) => updateUserInfo({ mobile_number: e.target.value })}
            placeholder="01012345678"
            className={cn("h-12 text-base", isRTL && "text-right")}
            dir={isRTL ? "rtl" : "ltr"}
          />
          <p
            className={cn(
              "text-xs text-muted-foreground",
              isRTL && "text-right"
            )}
          >
            {isRTL
              ? "تنسيق رقم الهاتف المحمول المصري"
              : "Egyptian mobile number format"}
          </p>
          {state.errors.mobile_number && (
            <p className="text-sm text-red-500">{state.errors.mobile_number}</p>
          )}
        </div>

        <div className="space-y-4">
          <Label
            className={cn("text-base font-semibold", isRTL && "text-right")}
          >
            {isRTL ? "عنوان البريد الإلكتروني *" : "Email Address *"}
          </Label>
          <Input
            type="email"
            value={state.userInfo.email || ""}
            onChange={(e) => updateUserInfo({ email: e.target.value })}
            placeholder="your.email@example.com"
            className="h-12 text-base"
            dir="ltr"
          />
          <p
            className={cn(
              "text-xs text-muted-foreground",
              isRTL && "text-right"
            )}
          >
            {isRTL
              ? "سيتم التواصل معك مباشرة عبر الهاتف لتأكيد عرض الأسعار"
              : "We will contact you directly by phone to confirm your quote"}
          </p>
          {state.errors.email && (
            <p className="text-sm text-red-500">{state.errors.email}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );

  const renderDocumentsStep = () => (
    <Card className="border-2 border-purple-100" dir={isRTL ? "rtl" : "ltr"}>
      <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
        <CardTitle
          className={cn("flex items-center gap-3", isRTL && "flex-row-reverse")}
        >
          <div className="p-2 bg-purple-500 rounded-lg">
            <FileText className="h-6 w-6 text-white" />
          </div>
          {isRTL ? "المستندات المطلوبة" : "Required Documents"}
        </CardTitle>
        <CardDescription className={isRTL ? "text-right" : ""}>
          {isRTL
            ? "يرجى رفع صور واضحة لمستنداتك للتحقق"
            : "Please upload clear photos of your documents for verification"}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-8 space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <h3 className={cn("font-semibold text-lg", isRTL && "text-right")}>
              {isRTL ? "الهوية الشخصية" : "Personal ID"}
            </h3>
            <FileUpload
              label={
                isRTL
                  ? "الهوية الشخصية (الوجه الأمامي)"
                  : "Personal ID (Front Side)"
              }
              onFileSelect={(file) =>
                updateDocuments({ personal_id_front: file })
              }
              onFileRemove={() => updateDocuments({ personal_id_front: null })}
              selectedFile={state.documents.personal_id_front}
              error={state.errors.personal_id_front}
            />
            <FileUpload
              label={
                isRTL
                  ? "الهوية الشخصية (الوجه الخلفي)"
                  : "Personal ID (Back Side)"
              }
              onFileSelect={(file) =>
                updateDocuments({ personal_id_back: file })
              }
              onFileRemove={() => updateDocuments({ personal_id_back: null })}
              selectedFile={state.documents.personal_id_back}
              error={state.errors.personal_id_back}
            />
          </div>

          <div className="space-y-6">
            <h3 className={cn("font-semibold text-lg", isRTL && "text-right")}>
              {isRTL ? "رخصة القيادة" : "Driver License"}
            </h3>
            <FileUpload
              label={
                isRTL
                  ? "رخصة القيادة (الوجه الأمامي)"
                  : "Driver License (Front Side)"
              }
              onFileSelect={(file) => updateDocuments({ license_front: file })}
              onFileRemove={() => updateDocuments({ license_front: null })}
              selectedFile={state.documents.license_front}
              error={state.errors.license_front}
            />
            <FileUpload
              label={
                isRTL
                  ? "رخصة القيادة (الوجه الخلفي)"
                  : "Driver License (Back Side)"
              }
              onFileSelect={(file) => updateDocuments({ license_back: file })}
              onFileRemove={() => updateDocuments({ license_back: null })}
              selectedFile={state.documents.license_back}
              error={state.errors.license_back}
            />
          </div>
        </div>

        <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <h4
            className={cn(
              "font-semibold text-blue-900 mb-3",
              isRTL && "text-right"
            )}
          >
            {isRTL ? "متطلبات المستندات" : "Document Requirements"}
          </h4>
          <ul
            className={cn(
              "text-sm text-blue-800 space-y-2",
              isRTL && "text-right"
            )}
          >
            <li>
              •{" "}
              {isRTL
                ? "تأكد من أن جميع النصوص مرئية وقابلة للقراءة بوضوح"
                : "Ensure all text is clearly visible and readable"}
            </li>
            <li>
              •{" "}
              {isRTL
                ? "يجب أن تكون الصور مضاءة جيداً بدون ظلال"
                : "Photos should be well-lit with no shadows"}
            </li>
            <li>
              •{" "}
              {isRTL
                ? "الصيغ المقبولة: JPG, PNG, PDF (حد أقصى 10 ميجابايت لكل ملف)"
                : "Accepted formats: JPG, PNG, PDF (max 10MB each)"}
            </li>
            <li>
              •{" "}
              {isRTL
                ? "يجب أن تكون المستندات سارية وغير منتهية الصلاحية"
                : "Documents must be valid and not expired"}
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );

  const renderOffersStep = () => (
    <div className="space-y-8">
      <Card className="border-2 border-orange-100">
        <CardHeader className="bg-gradient-to-r from-orange-50 to-yellow-50">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-3">
                {/* <div className="p-2 bg-orange-500 rounded-lg">
                  <Gift className="h-6 w-6 text-white" />
                </div> */}
                <span className={isRTL ? "text-right" : ""}>
                  {isRTL ? "عروض التأمين" : "Insurance Offers"}
                </span>
              </CardTitle>
              <CardDescription className={isRTL ? "text-right" : ""}>
                {isRTL
                  ? "اختر أفضل خطة تأمين تناسب احتياجاتك"
                  : "Choose the best insurance plan for your needs"}
              </CardDescription>
            </div>
            <LanguageSwitcher
              language={state.language}
              onLanguageChange={(lang) => updateState({ language: lang })}
            />
          </div>
        </CardHeader>
      </Card>

      {/* Offers Grid */}
      <div className="grid gap-8 lg:grid-cols-2 xl:grid-cols-3">
        {state.offers.map((offer, index) => (
          <EnhancedOfferCard
            key={index}
            offer={offer}
            language={state.language}
            isSelected={state.selectedOffer === offer}
            onSelect={() => updateState({ selectedOffer: offer })}
            rank={index + 1}
            carInfo={state.carInfo as CarInfo}
          />
        ))}
      </div>

      {state.selectedOffer && (
        <Card className="border-2 border-green-200 bg-gradient-to-r from-green-50 to-emerald-50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 text-green-700">
              <CheckCircle className="h-6 w-6" />
              <div className={isRTL ? "text-right" : ""}>
                <p className="font-semibold text-lg">
                  <span className={isRTL ? "text-right" : ""}>
                    {isRTL ? "المختار: " : "Selected: "}
                  </span>
                  {state.selectedOffer.company}
                </p>
                <p className="text-sm">
                  <span className={isRTL ? "text-right" : ""}>
                    {isRTL ? "القسط السنوي: " : "Annual Premium: "}
                  </span>
                  {state.selectedOffer.annualPremium.toLocaleString()} EGP
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );

  const renderThankYouStep = () => (
    <Card className="text-center border-2 border-green-200">
      <CardContent className="pt-12 pb-12">
        <div className="space-y-6">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>

          <div>
            <h2 className="text-3xl font-bold text-green-800 mb-2">
              {isRTL ? "شكراً لك!" : "Thank You!"}
            </h2>
            <p
              className={cn(
                "text-lg text-muted-foreground mb-6",
                isRTL && "text-right"
              )}
            >
              {isRTL
                ? "تم إرسال طلب عرض التأمين الخاص بك بنجاح."
                : "Your insurance quote request has been submitted successfully."}
            </p>
          </div>

          <div className="bg-blue-50 p-6 rounded-lg max-w-md mx-auto">
            <h3 className={cn("font-semibold mb-4", isRTL && "text-right")}>
              {isRTL ? "ماذا يحدث بعد ذلك؟" : "What happens next?"}
            </h3>
            <ul
              className={cn(
                "text-sm space-y-2",
                isRTL ? "text-right" : "text-left"
              )}
            >
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className={isRTL ? "text-right" : ""}>
                  {isRTL
                    ? "تم إرسال إشعار لفريق المبيعات"
                    : "Sales team has been notified"}
                </span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className={isRTL ? "text-right" : ""}>
                  {isRTL
                    ? "سيقوم فريقنا بمراجعة مستنداتك"
                    : "Our team will verify your documents"}
                </span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className={isRTL ? "text-right" : ""}>
                  {isRTL
                    ? "سيتم إعداد وثيقة التأمين الخاصة بك"
                    : "We'll prepare your insurance policy"}
                </span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className={isRTL ? "text-right" : ""}>
                  {isRTL
                    ? "ستتلقى مكالمة خلال 24 ساعة"
                    : "You'll receive a call within 24 hours"}
                </span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className={isRTL ? "text-right" : ""}>
                  {isRTL
                    ? "تفعيل الوثيقة عند تأكيد الدفع"
                    : "Policy activation upon payment"}
                </span>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <Button size="lg" onClick={() => (window.location.href = "/")}>
              {isRTL ? "العودة للرئيسية" : "Return to Home"}
            </Button>
            <p
              className={cn(
                "text-sm text-muted-foreground",
                isRTL && "text-right"
              )}
            >
              {isRTL
                ? "سيتم التواصل معك مباشرة عبر الهاتف لتأكيد التفاصيل والخطوات التالية."
                : "We will contact you directly by phone to confirm details and next steps."}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderCurrentStep = () => {
    switch (state.currentStep) {
      case "car-info":
        return renderCarInfoStep();
      case "user-info":
        return renderUserInfoStep();
      case "documents":
        return renderDocumentsStep();
      case "offers":
        return renderOffersStep();
      case "thank-you":
        return renderThankYouStep();
      default:
        return null;
    }
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 pt-32"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className={cn("text-center mb-8", isRTL && "text-right")}>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            {isRTL
              ? "احصل على عرض التأمين الخاص بك"
              : "Get Your Insurance Quote"}
          </h1>
          <p className="text-xl text-muted-foreground">
            {isRTL
              ? "أكمل الخطوات أدناه للحصول على عروض تأمين مخصصة"
              : "Complete the steps below to receive personalized insurance offers"}
          </p>
        </div>

        {/* Progress Section */}
        <div className="mb-12">
          <div
            className={cn(
              "flex items-center justify-between mb-4",
              isRTL && "flex-row-reverse"
            )}
          >
            <span className="text-sm font-medium">
              {isRTL ? "التقدم" : "Progress"}
            </span>
            <span className="text-sm text-muted-foreground">
              {isRTL
                ? `الخطوة ${currentStepIndex + 1} من ${steps.length}`
                : `Step ${currentStepIndex + 1} of ${steps.length}`}
            </span>
          </div>
          <Progress value={progress} className="h-3 mb-8" />

          {/* Clickable Step Indicators */}
          <div
            className={cn(
              "flex justify-between overflow-x-auto py-8",
              isRTL && "flex-row-reverse"
            )}
          >
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = index === currentStepIndex;
              const isCompleted = index < currentStepIndex;
              const canNavigate = canNavigateToStep(step.key);

              // Special handling for thank-you step - only accessible after submission
              const isThankYouStep = step.key === "thank-you";
              const canAccessThankYou =
                isThankYouStep && state.currentStep === "thank-you";

              return (
                <div
                  key={step.key}
                  className="flex flex-col items-center min-w-0 flex-1"
                >
                  <button
                    onClick={() => handleStepClick(step.key)}
                    disabled={
                      isThankYouStep
                        ? !canAccessThankYou
                        : !canNavigate && step.key !== state.currentStep
                    }
                    className={`
                      w-12 h-12 rounded-full flex items-center justify-center mb-3 transition-all duration-300 
                      ${
                        (canNavigate && !isThankYouStep) ||
                        step.key === state.currentStep ||
                        canAccessThankYou
                          ? "cursor-pointer hover:scale-105"
                          : "cursor-not-allowed"
                      }
                      ${
                        isActive
                          ? "bg-blue-600 text-white shadow-lg scale-110"
                          : isCompleted
                            ? "bg-green-500 text-white hover:bg-green-600"
                            : (canNavigate && !isThankYouStep) ||
                                canAccessThankYou
                              ? "bg-gray-200 text-gray-500 hover:bg-gray-300"
                              : "bg-gray-100 text-gray-400"
                      }
                    `}
                  >
                    {!canNavigate &&
                    !isActive &&
                    !isCompleted &&
                    !canAccessThankYou ? (
                      <AlertCircle className="h-6 w-6" />
                    ) : (
                      <Icon className="h-6 w-6" />
                    )}
                  </button>
                  <div className={cn("text-center", isRTL && "text-right")}>
                    <p
                      className={`text-sm font-medium ${
                        isActive
                          ? "text-blue-600"
                          : (canNavigate && !isThankYouStep) ||
                              canAccessThankYou
                            ? "text-gray-700"
                            : "text-gray-400"
                      }`}
                    >
                      {step.title}
                    </p>
                    <p className="text-xs text-gray-400 hidden sm:block">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Current Step Content */}
        <div className="mb-12">{renderCurrentStep()}</div>

        {/* Navigation Buttons */}
        {state.currentStep !== "thank-you" && (
          <div
            className={cn(
              "flex justify-between items-center",
              isRTL && "flex-row-reverse"
            )}
          >
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={state.currentStep === "car-info"}
              className={cn(
                "flex items-center gap-2 px-6 py-3",
                isRTL && "flex-row-reverse"
              )}
              size="lg"
            >
              <ArrowLeft className={cn("h-4 w-4", isRTL && "rotate-180")} />
              {isRTL ? "السابق" : "Back"}
            </Button>

            {state.currentStep === "offers" ? (
              <Button
                onClick={handleSubmit}
                disabled={!state.selectedOffer || isSubmitting}
                className={cn(
                  "flex items-center gap-2 px-8 py-3",
                  isRTL && "flex-row-reverse"
                )}
                size="lg"
              >
                {isSubmitting
                  ? isRTL
                    ? "جاري الإرسال..."
                    : "Submitting..."
                  : isRTL
                    ? "إرسال الطلب"
                    : "Submit Quote"}
                <ArrowRight className={cn("h-4 w-4", isRTL && "rotate-180")} />
              </Button>
            ) : (
              <Button
                onClick={handleNext}
                className={cn(
                  "flex items-center gap-2 px-6 py-3",
                  isRTL && "flex-row-reverse"
                )}
                size="lg"
              >
                {isRTL ? "التالي" : "Next"}
                <ArrowRight className={cn("h-4 w-4", isRTL && "rotate-180")} />
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
