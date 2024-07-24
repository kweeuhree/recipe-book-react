// import react icon
import { FaRegWindowClose } from "react-icons/fa";
// import formatting logic
import { formattedDate } from "../../utils/formatDate"; 

const Note = ({ note, onClick}) => {

    const dateCreated = formattedDate(note?.date_created);
  return (
    <div className='note'>
        <span>{note?.body}</span>
        <div className="right-box">
            <span>{dateCreated}</span>
            <span onClick={onClick}>
             <FaRegWindowClose />
          </span>
        </div>
          
   </div>
  )
}

export default Note