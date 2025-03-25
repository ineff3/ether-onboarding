interface Props {
  children: React.ReactNode
}

export const Container = ({ children }: Props) => {
  return <div className="bg-secondary py-3 px-4 rounded-lg text-secondary-foreground">{children}</div>
}
