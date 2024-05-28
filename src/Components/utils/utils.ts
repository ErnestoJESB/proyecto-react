export const formatDate = (date: any) => {
    const d = new Date(date);
    const day = d.getDate();
    const month = d.getMonth() + 1;
    const year = d.getFullYear();
    // const hours = d.getHours() % 12 || 12;
    // const minutes = d.getMinutes();
    // const ampm = d.getHours() < 11 ? "AM" : "PM";

    const addPadding = (x: number) => x.toString().padStart(2, "0");

  return `${addPadding(day)}/${addPadding(month)}/${year} `;
  // ${addPadding(
  //     hours
  // )}:${addPadding(minutes)} ${ampm}`;
};

export const formatDateWithHours = (date: string) => {
  const inputDate = new Date(date);
  const options: Intl.DateTimeFormatOptions = {
    /* weekday: "short", */
    year: "numeric",
    month: "2-digit",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true, // Use 12-hour clock format with AM/PM
  };

  const formattedDate = inputDate.toLocaleDateString("es-ES", options);
  return formattedDate;
};

export const formatCurrency = (number: number): string => {
    return new Intl.NumberFormat("es-MX", {
        style: "currency",
        currency: "MXN",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(number);
};

export const formatThousands = (numero: number): string => {
    return numero?.toLocaleString("es-MX", { maximumFractionDigits: 20 });
};

export const downloadBlobAsFile = (
    blob: Blob,
    name: string,
    format?: string
): void => {
    const url = window.URL.createObjectURL(new Blob([blob]));
    const link = document.createElement("a");
    const fileName = format ? `${name}.${format}` : name;
    link.href = url;
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
    link.remove();
};

//Format time in 12 and 24 hour format
export const transformTo12HourFormat = (
  timeIn24Hour: number | string,
  format?: number
): string => {
  // Convert the input to a string to handle single-digit times (e.g., "102").
  const timeStr: string = timeIn24Hour.toString();
  // Check if the time string is in the correct format (HHMM) and has at least 3 characters.
  if (timeStr.length < 3) {
    return "Invalid input";
  }
  // Extract hours and minutes from the input string.
  let hours: number = parseInt(timeStr.slice(0, -2));
  const minutes: number = parseInt(timeStr.slice(-2));
  // Determine if it's AM or PM.
  const period: string = hours < 12 ? "am" : "pm";
  if (format) {
    if (format === 12) {
      // 12 hours format
      if (hours === 0) {
        // Convert to 12-hour format.
        hours = 12;
      } else if (hours > 12) {
        hours -= 12;
      }
      // Format the result.
      return `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")} ${period}`;
    } else if (format === 24) {
      // 24 hours format
      // Format the result.
      return `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}`;
    } else return "Invalid format";
  }

  if (hours === 0) {
    // Convert to 12-hour format.
    hours = 12;
  } else if (hours > 12) {
    hours -= 12;
  }
  // Format the result.
  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")} ${period}`;
};

const getDateNowFormat = (): string => {
  const fechaActual: Date = new Date();
  const anio: number = fechaActual.getFullYear();
  const mes: string = String(fechaActual.getMonth() + 1).padStart(2, '0');
  const dia: string = String(fechaActual.getDate()).padStart(2, '0');
  const horas: string = String(fechaActual.getHours()).padStart(2, '0');
  const minutos: string = String(fechaActual.getMinutes()).padStart(2, '0');
  const segundos: string = String(fechaActual.getSeconds()).padStart(2, '0');
  const milisegundos: string = String(fechaActual.getMilliseconds()).padStart(3, '0');
  const fechaFormateada: string = `${anio}-${mes}-${dia} ${horas}:${minutos}:${segundos}.${milisegundos}`;
  return fechaFormateada;
}; 
export { getDateNowFormat }

