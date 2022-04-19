import {LocalBusiness, Thing, WithContext, PostalAddress} from 'schema-dts';

export function JsonLd<T extends Thing>(json: WithContext<T>): string {
  return `<script type="application/ld+json">
${JSON.stringify(json)}
</script>`;
}

export const SchemaWrapper = (data: any) => {
  return JsonLd<LocalBusiness>({
    '@context': 'https://schema.org',
    '@type': 'ClothingStore', // TODO: change this to match the current project's business type
    "@id": data.document.streamOutput._site.uid,
    name: data.document.streamOutput.name,
    address: parseAddress(data.document.streamOutput.address),
    description: data.document.streamOutput.description,
    telephone: data.document.streamOutput.mainPhone,
    image: data.document.streamOutput.photoGallery[0].image.url,
    openingHours: parseOpeningHours(data.document.streamOutput.hours),
    paymentAccepted: data.document.streamOutput.paymentOptions,
  });  
}

export const parseAddress = (address: any): PostalAddress => {
  return {
    "@type": "PostalAddress",
    "streetAddress": address.line1,
    "addressLocality": address.city,
    "addressRegion": address.region,
    "postalCode": address.postalCode,
    "addressCountry": address.countryCode,
  };
}

// example output: ["Mo-Fr 10:00-19:00", "Sa 10:00-22:00", "Su 10:00-21:00"]
// weekdays are indicated as Mo, Tu, We, Th, Fr, Sa, Su
export const parseOpeningHours = (hours: any) => {
  let hoursMap = new Map<string, Array<string>>();

  hoursMap = getHoursByDay(hours.monday, hoursMap, "Mo")
  hoursMap = getHoursByDay(hours.tuesday, hoursMap, "Tu")
  hoursMap = getHoursByDay(hours.wednesday, hoursMap, "We")
  hoursMap = getHoursByDay(hours.thursday, hoursMap, "Th")
  hoursMap = getHoursByDay(hours.friday, hoursMap, "Fr")
  hoursMap = getHoursByDay(hours.saturday, hoursMap, "Sa")
  hoursMap = getHoursByDay(hours.sunday, hoursMap, "Su")

  let hoursArray = new Array<string>();

  for (const [interval, days] of hoursMap){
    let daysOfWeek = days.join(",")
    hoursArray.push(daysOfWeek + " " + interval)
  }

  return hoursArray
}

export const getHoursByDay = (hours: any, hoursMap: Map<string, Array<string>>, day: string) => {
  if (hours.isClosed == true) {
    let interval = "00:00-00:00"
    let days = hoursMap.get(interval) ?? Array<string>();
    days.push(day)
    hoursMap.set(interval, days);

    return hoursMap
  }

  for (let i = 0; i < hours.openIntervals.length; i++) {
    let interval = hours.openIntervals[i].start + "-" + hours.openIntervals[i].end;
    let days = hoursMap.get(interval) ?? Array<string>();
    days.push(day)
    hoursMap.set(interval, days);
  }

  return hoursMap
}