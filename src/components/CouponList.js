import React, { useState } from 'react'
import Coupon from './Coupon';
import ModalForm from './ModalForm';
import './CouponList.css';

const CouponList = () => {
    const [coupons, setCoupons] = useState([]);
    const modalRef = React.useRef();

    React.useEffect(() => {
        const data = localStorage.getItem('Coupons');
        if (data) {
            setCoupons(JSON.parse(data));
        }
    }, []);

    React.useEffect(() => {
        localStorage.setItem('Coupons', JSON.stringify(coupons));
    });

    const addCoupon = coupon => {
        if (!coupon.name || !coupon.start || !coupon.end) {
            return;
        }

        const newCoupons = [coupon, ...coupons];
        setCoupons(newCoupons);
    }

    const editCoupon = (id, coupon) => {
        if (!coupon) {
            return;
        }
        setCoupons(prev => prev.map(item => (item.id === id ? coupon : item)));
    }

    const deleteCoupon = (id) => {
        const removedCoupon = [...coupons].filter(x => x.id !== id);

        setCoupons(removedCoupon);
    }
   
    const handleOnDragEnd = (result) => {
        if(!result.destination) return;

        const items = Array.from(coupons);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        setCoupons(items); 
    }

    return (
        <div>
            <h1 className='header'>Coupon App</h1>
            <button
                className='addCouponBtn'
                onClick={() => modalRef.current.open()}
            >
                Coupon anlegen
            </button>
            <ModalForm ref={modalRef} onSubmit={addCoupon} />
            <Coupon
                coupons={coupons}
                editCoupon={editCoupon}
                deleteCoupon={deleteCoupon}
                handleOnDragEnd={handleOnDragEnd}
            />
        </div>
    )
}

export default CouponList;