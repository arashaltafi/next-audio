import * as jalaali from 'jalaali-js';

export const scrollToId = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

export const convertSecondToTime = (second: number) => {
    const hours = Math.floor(second / 3600)
    const minutes = Math.floor((second % 3600) / 60)
    const seconds = Math.floor(second % 60)
    const padToTwoDigits = (num: number): string => num.toString().padStart(2, '0');

    if (hours > 0) {
        return `${padToTwoDigits(hours)}:${padToTwoDigits(minutes)}:${padToTwoDigits(seconds)}`;
    } else if (minutes > 0) {
        return `${padToTwoDigits(minutes)}:${padToTwoDigits(seconds)}`;
    } else {
        return `00:${padToTwoDigits(seconds)}`;
    }
}

export const getDeviceSize = (): string => {
    if (typeof window !== 'undefined') {
        const width = window.innerWidth;
        if (width >= 0 && width < 300) return 'xm';
        if (width >= 300 && width < 480) return 'sm';
        if (width >= 480 && width < 640) return 'md';
        if (width >= 640 && width < 768) return 'lg';
        if (width >= 768 && width < 1024) return 'xl';
    }
    return 'xl';
}

export const onlyNumber: RegExp = /^[0-9]*$/;

export const base64ToBlob = (base64: string, contentType: string = 'application/pdf'): Blob => {
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: contentType });
};

export const checkOnlyNumber = (number: number | string) => {
    if (number === null) return false
    if (number.toString().match(onlyNumber) !== null) {
        return true;
    } else {
        return false;
    }
}

export const numberValidation = (value: string | number) => {
    let newValue = value.toString().replaceAll(",", "");
    if (newValue.match(onlyNumber) !== null) {
        return true;
    } else {
        return false;
    }
};

export function phoneNumberCheck(value: string): boolean {
    if (value.slice(0, 2) === "09" && value.length === 11) {
        return true;
    } else {
        return false;
    }
}

export const nationalCodeCheck = (id: string) => {
    if (
        id === "0000000000" ||
        id === "1111111111" ||
        id === "2222222222" ||
        id === "3333333333" ||
        id === "4444444444" ||
        id === "5555555555" ||
        id === "6666666666" ||
        id === "7777777777" ||
        id === "8888888888" ||
        id === "9999999999"
    ) {
        return false;
    }
    const nationalIdRegex = /^\d{10}$/;
    const isValidFormat = nationalIdRegex.test(id);

    if (isValidFormat) {
        const controlNumber = parseInt(id[9]);
        const sum =
            Array.from({ length: 9 }, (_, i) => parseInt(id[i]) * (10 - i)).reduce(
                (a, b) => a + b,
                0
            ) % 11;

        if (
            (sum < 2 && controlNumber === sum) ||
            (sum >= 2 && controlNumber === 11 - sum)
        ) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
};

export function faNumToEn(number: string) {
    let newNumber = number
        .replaceAll("۰", "0")
        .replaceAll("۱", "1")
        .replaceAll("۲", "2")
        .replaceAll("۳", "3")
        .replaceAll("۴", "4")
        .replaceAll("۵", "5")
        .replaceAll("۶", "6")
        .replaceAll("۷", "7")
        .replaceAll("۸", "8")
        .replaceAll("۹", "9");
    return newNumber;
}

export const ThousandSeperator = (value: string | number) => {
    if (value === null) {
        return "0";
    }
    let a: string = value.toString();
    a = a.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return a;
};

export const dayArray = [
    "روز",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
    "24",
    "25",
    "26",
    "27",
    "28",
    "29",
    "30",
    "31",
];

export const monthArray = [
    "ماه",
    "فروردین",
    "اردیبهشت",
    "خرداد",
    "تیر",
    "مرداد",
    "شهریور",
    "مهر",
    "آبان",
    "آذر",
    "دی",
    "بهمن",
    "اسفند",
];

export const monthNameToNumber = (name: string) => {
    let i = 0;
    monthArray.forEach((element, key) => {
        if (name === element) {
            i = key;
        }
    });
    return i.toString();
};

export const checkDateValidation = (
    day: string,
    month: string,
    year: string
) => {
    if (day === "روز" || month === "ماه" || year === "") {
        return false;
    }
    if (day === "" || month === "" || year.length !== 4) {
        return false;
    }
    if (
        (month === "12" ||
            month === "11" ||
            month === "10" ||
            month === "9" ||
            month === "8" ||
            month === "7") &&
        day === "31"
    ) {
        return false;
    }
    if (month === "12" && Number(year) % 4 !== 3 && day === "30") {
        return false;
    }
    if (Number(year) < 1300 || Number(year) > 1403) {
        return false;
    }
    return true;
};

export const createStandardDate = (
    day: string,
    month: string,
    year: string
) => {
    let newDay = day;
    let newMonth = month;
    if (newDay.length === 1) {
        newDay = `0${newDay}`;
    }
    if (newMonth.length === 1) {
        newMonth = `0${newMonth}`;
    }
    return `${year}-${newMonth}-${newDay}`;
};

export const convertUnixToPersianDate = (unixTimestamp: number, returnType: "string" | "object" = "string"): { jy: number, jm: number, jd: number } | string => {
    // Convert Unix timestamp to a JavaScript Date object
    const date = new Date(unixTimestamp * 1000);

    // Extract the Gregorian date parts (year, month, day)
    const gregorianYear = date.getUTCFullYear();
    const gregorianMonth = date.getUTCMonth() + 1; // JavaScript months are 0-based, so we add 1
    const gregorianDay = date.getUTCDate();

    // Convert Gregorian date to Persian (Jalali) date
    const persianDate = jalaali.toJalaali(gregorianYear, gregorianMonth, gregorianDay);
    const formattedPersianDate = `${persianDate.jy}/${persianDate.jm.toString().padStart(2, '0')}/${persianDate.jd.toString().padStart(2, '0')}`;

    if (returnType === "object") {
        return persianDate;
    } else {
        return formattedPersianDate
    }
}

export const convertPersianDateToUnix = (
    persianDate: { year: number, month: number, day: number } | string,
    divider: "/" | "-" = "/"
): number => {
    let gregorianDate;

    // Convert Persian (Jalali) date to Gregorian date
    if (typeof (persianDate) == "string") {
        const [year, month, day] = persianDate.split(divider).map(Number);
        gregorianDate = jalaali.toGregorian(year, month, day);
    } else {
        const { year, month, day } = persianDate;
        gregorianDate = jalaali.toGregorian(year, month, day);
    }

    // Create a JavaScript Date object using the Gregorian date
    const date = new Date(Date.UTC(gregorianDate.gy, gregorianDate.gm - 1, gregorianDate.gd));

    // Convert the date to Unix timestamp (in seconds)
    return Math.floor(date.getTime() / 1000);
}