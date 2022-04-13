import {ClothingStore, LocalBusiness, Organization, Thing, WithContext, PostalAddress} from 'schema-dts';

export function JsonLd<T extends Thing>(json: WithContext<T>): string {
  return `<script type="application/ld+json">
${JSON.stringify(json)}
</script>`;
}

export const SchemaWrapper = (data: any) => {
  return JsonLd<ClothingStore>({
    '@context': 'https://schema.org',
    '@type': 'ClothingStore',
    "@id": data.document.streamOutput._site.uid,
    name: data.document.streamOutput.name,
    address: parseAddress(data),
    description: data.document.streamOutput.description,
    telephone: data.document.streamOutput.mainPhone,
    image: data.document.streamOutput.photoGallery[0].image.url,
    openingHoursSpecification: data.document.streamOutput.hours, // TODO: parse hours
    paymentAccepted: data.document.streamOutput.paymentOptions,
    logo: data.document.streamOutput.logo, // this entry will not show up if logo is nil 
  });  
}

export const parseAddress = (data: any) => {
  const address: PostalAddress = {
    "@type": "PostalAddress",
    "streetAddress": data.document.streamOutput.address.line1,
    "addressLocality": data.document.streamOutput.address.city,
    "addressRegion": data.document.streamOutput.address.region,
    "postalCode": data.document.streamOutput.address.postalCode,
    "addressCountry": data.document.streamOutput.address.countryCode,
  }

  return address;
}