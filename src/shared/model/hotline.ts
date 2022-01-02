export enum BusinessAccountStatusEnum {
    ACTIVE = 'active',
    DISABLED = 'disabled',
}

export type BusinessAccountShortOutput = {
    status: BusinessAccountStatusEnum;
    id: string;
    companyName: string;
};

export type CompanyShortOutput = {
    status: BusinessAccountStatusEnum;
    id: string;
    companyName: string;
};

export enum EducationDegreeEnum {
    BA = 0,
    MASTERS_DEGREE = 1,
    DR = 2,
    PROFESSOR = 3,
}

export enum FilterDirectionEnum {
    LessOrEqualThan = 'lte',
    GreaterOrEqualThan = 'gte',
}

export type PurchasedTelephoneOutput = {
    id: string;
    telephone: string;
    price: { amount: string; currency: string; formatted: string; symbol: string };
    createdAt: string;
    active: boolean;
    expired: boolean;
    country: string;
    reservedFrom: string | null;
    reservedTo: string | null;
};

export enum HotLineModuleEnum {
    MODULE_SCHEDULE_MEETING = 0,
    MODULE_PRODUCT_CATALOG = 1,
    MODULE_STAFF_MEMBER = 2,
    MODULE_NEARBY_INFRASTRUCTURE = 3,
    MODULE_FAQ = 4,
    MODULE_ACTIVITY = 5,
    MODULE_MEDIA_ATTACHMENT = 6,
}

export enum HotLineTypeEnum {
    INFO = 'info',
    SURVEY = 'survey',
    MEETING = 'meeting',
    SALE = 'sale',
    CUSTOMER_SUPPORT = 'customer_support',
    DONATION = 'donation',
    COLLECTION = 'collection',
    INFORMATION = 'information',
    SUBSCRIPTION = 'subscription',
    COMPLAINT = 'complaint',
    MESSAGE = 'message',
    BOOKING = 'booking',
    EMERGENCY = 'emergency',
    OTHER = 'other',
}
export enum LanguageLevelEnum {
    BASIC = 10,
    INTERMEDIATE = 20,
    ADVANCED = 30,
}

export enum WorkingDaysEnum {
    _7_DAYS_IN_WEEK = 0,
    _6_DAYS_IN_WEEK = 1,
    _5_DAYS_IN_WEEK = 2,
    _365_DAYS_IN_YEAR = 3,
}

export enum WorkingHoursEnum {
    _24_H = 0,
    _08AM_05PM = 1,
    _08AM_10PM = 2,
}

export type WorkingHoursOutput = {
    isInScheduleTime: boolean;
    workingHours: WorkingHoursEnum | null;
    workingDays: WorkingDaysEnum | null;
    holidaysEnabled: boolean | null;
};

export enum HotlineCallDirectionTypeEnum {
    INCOMING = 1,
    OUTGOING = 2,
}

export enum GenderHotlineRequirementsEnum {
    BOTH = 0,
    MALE = 1,
    FEMALE = 2,
}

export enum NotificationFeedTypeEnum {
    AGENT = 'agent',
    BUSINESS = 'business',
    PARTNER = 'partner',
    SYSTEM = 'system',
}

export enum NotificationSeverityTypeEnum {
    INFO = 1,
    NOTICE = 2,
    WARNING = 3,
    ERROR = 4,
}
export type PersonalNotificationMessageOutput = {
    id: string;
    text: string;
    createdAt: string;
    fromType: NotificationFeedTypeEnum;
    severity: NotificationSeverityTypeEnum;
    isRead: boolean;
    context: any[];
    fromUser: string | null;
};

export type Hotline = {
    id: string;
    name: string;
    description: string | null;
    business: BusinessAccountShortOutput;
    company: CompanyShortOutput | null;
    educationDegree: { level: EducationDegreeEnum; filterDirection: FilterDirectionEnum };
    createdAt: string;
    telephone: PurchasedTelephoneOutput | null;
    type: HotLineTypeEnum;
    languageRequirement: {
        language: string;
        level: LanguageLevelEnum;
        filterDirection: FilterDirectionEnum;
    };
    locale: { locale: string; country: string; timezoneId: string; timezoneOffset: number };
    isActivated: boolean;
    isEnabled: boolean;
    activationHours: WorkingHoursOutput | null;
    callDirectionType: HotlineCallDirectionTypeEnum;
    genderRequirement: GenderHotlineRequirementsEnum;
    industries: any[];
    notifications: PersonalNotificationMessageOutput[];
    welcomeMessage: string | null;
};