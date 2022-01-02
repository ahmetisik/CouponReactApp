import React, { useState } from 'react';
import { AiFillDelete } from "react-icons/ai";
import { AiFillEdit } from "react-icons/ai";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import ModalForm from './ModalForm';
import "./Coupon.css";

const Coupon = ({ coupons, deleteCoupon, editCoupon, handleOnDragEnd }) => {
    const modalRef = React.useRef();
    const [edit, setEdit] = useState({
        id: null
    });

    const submitEdit = value => {
        editCoupon(edit.id, value);
        setEdit({
            id: null,
            name: value.name,
            ean: value.ean,
            status: value.status,
            start: value.start,
            end: value.end
        });
    };

    const editCouponButton = (id, name, ean, status, discount, start, end) => {
        try {
            modalRef.current.open();
        } catch (error) {
            //console.log(modalRef.current)
        }
        setEdit({
            id: id,
            name: name,
            ean: ean,
            status: status,
            discount: discount,
            start: localeDateStringToDate(start),
            end: localeDateStringToDate(end)
        })
    };

    const localeDateStringToDate = (stringDate) => {
        var field = stringDate.split('.');
        return new Date(field[2], field[1] - 1, field[0]);
    };

    return (
        <div className='container'>
            <DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable droppableId='droppableId'>
                    {(provided) => (
                        <ul {...provided.droppableProps} ref={provided.innerRef}>
                            {coupons.map((coupon, index) => (
                                <Draggable key={coupon.id} draggableId={coupon.id.toString()} index={index}>
                                    {(provided) => (
                                        <li
                                            className={(coupon.status === 'Aktiv' ? 'activeCoupon' : 'inactiveCoupon')}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            ref={provided.innerRef}
                                        >
                                            <div className='coupon' >
                                                <div className="vertical"></div>
                                                <div className='leftSideCoupon'>
                                                    <h2>{coupon.name}</h2>
                                                    <p>Sparen Sie <b>{coupon.discount} €</b></p>
                                                    <p className='dateText'>Von <b>{coupon.start}</b> bis <b>{coupon.end}</b> gültig!</p>
                                                    <p>EAN: {coupon.ean}</p>
                                                </div>
                                                <div className='rightSideCoupon'>
                                                    <AiFillEdit
                                                        className='icon'
                                                        size={40}
                                                        color='white'
                                                        onClick={() => editCouponButton(coupon.id, coupon.name, coupon.ean, coupon.status, coupon.discount, coupon.start, coupon.end)}
                                                    />
                                                    <AiFillDelete
                                                        className='icon'
                                                        color='white'
                                                        size={40}
                                                        onClick={() => deleteCoupon(coupon.id)}
                                                    />
                                                </div>
                                            </div>
                                        </li>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </ul>
                    )}
                </Droppable>
            </DragDropContext>
            
            {edit.id && <ModalForm ref={modalRef} edit={edit} onSubmit={submitEdit} />}
            
        </div>
    )
}

Coupon.defaultProps = {
    name: '',
    ean: '',
    discount: '',
    periodStart: '',
    periodEnd: '',
    status: 0
}

export default Coupon;
