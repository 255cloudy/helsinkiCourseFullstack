const Header = (props)=>{
  return (<h2>{props.course}</h2>)
}
const Part = (props) => {
  return (
   <p>
    {props.part.name} {props.part.exercises}
  </p>
 )
}
const Content = (props)=> {
  return (
    <div>
      {
        props.parts.map(part=> (<Part part={part}/>))
      }
    </div>
  )
}
const Total = (props) => {
  const totalExcercises = props.parts.reduce((accumulator, current)=> accumulator+current.exercises,0)
  return (
    <h3>Number of exercises {totalExcercises}</h3>
  )
} 

const Course = (props)=>{
  const {course} = props
  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  )
}
export default Course