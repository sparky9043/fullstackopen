interface ErrorProps {
  errorMessage: string;
}

const Error = (props: ErrorProps) => {
  return (
    <p>{props.errorMessage}</p>
  )
}

export default Error;