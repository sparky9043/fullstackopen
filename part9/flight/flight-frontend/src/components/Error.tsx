interface ErrorProps {
  errorMessage: string;
}

const Error = (props: ErrorProps) => {
  return (
    <p className='error-message'>{props.errorMessage}</p>
  )
}

export default Error;