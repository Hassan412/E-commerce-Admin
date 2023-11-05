interface HeadingProps {
    title: string,
    discription: string,
}

const Heading:React.FC<HeadingProps> = ({
    title,
    discription,
}) => {
  return (
    <div>
        <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
        <p className="text-sm text-muted-foreground">{discription}</p>
    </div>
  )
}

export default Heading