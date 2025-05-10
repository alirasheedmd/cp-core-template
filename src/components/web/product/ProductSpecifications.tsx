interface ProductSpecificationsProps {
  isPhysicalProduct: boolean
  weight?: string | null
  weightUnit?: string | null
  height?: string | null
  width?: string | null
  length?: string | null
  country?: string | null
  hsCode?: string | null
}

export default function ProductSpecifications({
  isPhysicalProduct,
  weight,
  weightUnit,
  height,
  width,
  length,
  country,
  hsCode,
}: ProductSpecificationsProps) {
  const specs = [
    {
      label: 'Product Type',
      value: isPhysicalProduct ? 'Physical Product' : 'Digital Product',
    },
    {
      label: 'Weight',
      value: weight ? `${weight} ${weightUnit || ''}` : 'N/A',
    },
    {
      label: 'Dimensions',
      value:
        height && width && length ? `${height} × ${width} × ${length}` : 'N/A',
    },
    { label: 'Country of Origin', value: country || 'N/A' },
    { label: 'HS Code', value: hsCode || 'N/A' },
  ]

  return (
    <div className="bg-LightWhite rounded-lg p-6 shadow-sm">
      <h2 className="text-DarkGrey mb-4 text-lg font-semibold">
        Specifications
      </h2>
      <dl className="grid grid-cols-1 gap-4">
        {specs.map((spec) => (
          <div key={spec?.label} className="grid grid-cols-3 gap-4">
            <dt className="text-MediumGrey text-sm font-medium">
              {spec?.label}
            </dt>
            <dd className="text-DarkGrey col-span-2 text-sm">{spec?.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
