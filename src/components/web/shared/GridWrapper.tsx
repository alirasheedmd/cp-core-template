interface GridWrapperProps<
  T extends { id?: string | number },
  P extends Record<string, unknown>,
> {
  data: T[]
  CardComponent: React.ComponentType<P>
  cardProps: (item: T) => P
  className?: string
  keyExtractor?: (item: T) => string | number
}

export default function GridWrapper<
  T extends { id?: string | number },
  P extends Record<string, unknown>,
>({
  data,
  CardComponent,
  cardProps,
  className = '',
  keyExtractor = (item: T) => item.id ?? '',
}: GridWrapperProps<T, P>) {
  return (
    <div
      className={`grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-10 lg:grid-cols-4 xl:grid-cols-5 ${className}`}
    >
      {data.map((item) => (
        <CardComponent key={keyExtractor(item)} {...cardProps(item)} />
      ))}
    </div>
  )
}
