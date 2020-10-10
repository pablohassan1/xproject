import React from 'react';
import './ListItems.styles.css';
import Button from '../button/button.component';


const ListItems = props => {
    const items = props.items;

    return(
        items.map(item =>
            {
                return (
                 <tr key={item.myId}>
                     <td>{item.name}</td>
                     <td>{item.email}</td>
                     <td>{item.phone}</td>
                     <td>
                         <div className='action'>
                             <Button type='button' action={ () => props.readItem(item)} name='Read' color='white' />
                             <Button name='Update' color='green' />
                             <Button class='hidden' name='Save' color='green' />
                             <Button type='button' action={ () => props.deleteItem(item.myId)} name='Delete' color='red' />
                         </div>
                     </td>                
                 </tr>
                )
             }
             )
    )
   
}


export default ListItems;



       
       
       
       
       
       

    
  

  