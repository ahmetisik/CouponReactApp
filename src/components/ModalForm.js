import React, { useState, forwardRef, useImperativeHandle } from 'react'
import { AiFillCloseCircle } from 'react-icons/ai';
import DatePicker, { registerLocale } from "react-datepicker";
import de from "date-fns/locale/de"
import ReactDom from 'react-dom'
import 'react-datepicker/dist/react-datepicker.css'
import './ModalForm.css';
registerLocale("de", de);

const ModalForm = forwardRef((props, ref) => {
    const [name, setName] = useState(props.edit ? props.edit.name : '');
    const [discount, setDiscount] = useState(props.edit ? props.edit.discount : '');
    const [start, setStart] = useState(props.edit ? props.edit.start : '');
    const [end, setEnd] = useState(props.edit ? props.edit.end : '');
    const [openModal, setOpenModal] = useState(false);

    useImperativeHandle(ref, () => {
        return {
            open: () => open(),
            close: () => close()
        }
    })

    const open = () => {
        setOpenModal(true)
    };

    const close = () => {
        setOpenModal(false);
    };

    const handleSubmit = e => {
        e.preventDefault();

        let startLocaleDateString = null;
        let endLocaleDateString = null;

        if (start && end) {
            startLocaleDateString = start.toLocaleDateString();
            endLocaleDateString = end.toLocaleDateString();
        }

        props.onSubmit({
            id: Math.floor(Math.random() * 10000), // add true unique id evtl mit React Uuid
            name: name,
            ean: (9810000000000 + Math.floor(Math.random() * 9999999999)), //add unique id
            status: checkStatus(),
            discount: discount,
            start: startLocaleDateString,
            end: endLocaleDateString
        });
        setName('');
        setDiscount('');
        setStart('');
        setEnd('');
        close();
    };

    const checkStatus = () => {
        const now = new Date();
        if (now >= start && now < end) {
            return 'Aktiv'
        }
        return 'Inaktiv'
    }

    if (openModal) {
        return ReactDom.createPortal(
            <>
                <div style={OVERLAY_STYLES} onClick={close}></div>
                <div style={MODAL_STYLES}>
                    <form className='modalForm'>
                        <div className="closeBtn">
                            <AiFillCloseCircle
                                size={30}
                                onClick={close}
                                color='#263d5a'
                            />
                        </div>
                        {props.edit ? (
                            <div className='formInputs'>
                                <div>
                                    <h1>Coupon bearbeiten</h1>
                                </div>
                                <div className='formInputBox'>
                                    <label>Aktionsname</label>
                                    <input
                                        placeholder='Coupon Barbeiten'
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        name='text'
                                        className='couponInput'
                                        required
                                    />
                                </div>
                                <div className='formInputBox'>
                                    <label>Rabattwert</label>
                                    <input
                                        placeholder='z.B. 0,50 EUR'
                                        value={discount}
                                        onChange={(e) => setDiscount(e.target.value)}
                                        className='couponInput'
                                    />
                                </div>

                                <div className='formInputBox'>
                                    <label>Start-Datum</label>
                                    <DatePicker
                                        selected={start}
                                        onChange={(e) => setStart(e)}
                                        dateFormat='dd.MM.yyyy'
                                        locale="de"
                                        className='couponInput'
                                        selectsStart
                                        startDate={start}
                                        endDate={end}
                                        required
                                    />
                                </div>
                                <div className='formInputBox'>
                                    <label>Ende-Datum</label>
                                    <DatePicker
                                        selected={end}
                                        onChange={(e) => setEnd(e)}
                                        dateFormat='dd.MM.yyyy'
                                        locale="de"
                                        className='couponInput'
                                        selectsEnd
                                        startDate={start}
                                        endDate={end}
                                        required
                                    />
                                </div>

                                <button className='submitFormBtn' onClick={handleSubmit}>
                                    Bearbeiten
                                </button>
                            </div>
                        ) : (
                            <div className='formInputs'>
                                <div>
                                    <h1>Coupon hinzufügen</h1>
                                </div>
                                <div className='formInputBox'>
                                    <label>Aktionsname</label>
                                    <input
                                        placeholder='z.B. 0,50 EUR Rabatt bei Kauf von Cola'
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        name='text'
                                        className='couponInput'
                                        required
                                    />
                                </div>
                                <div className='formInputBox'>
                                    <label>Rabattwert</label>
                                    <input
                                        placeholder='z.B. 0,50 EUR'
                                        value={discount}
                                        onChange={(e) => setDiscount(e.target.value)}
                                        className='couponInput'
                                    />
                                </div>

                                <div className='formInputBox'>
                                    <label>Start-Datum</label>
                                    <DatePicker
                                        selected={start}
                                        onChange={(e) => setStart(e)}
                                        dateFormat='dd.MM.yyyy'
                                        locale="de"
                                        className='couponInput'
                                        selectsStart
                                        startDate={start}
                                        endDate={end}
                                        required
                                    />
                                </div>
                                <div className='formInputBox'>
                                    <label>Ende-Datum</label>
                                    <DatePicker
                                        selected={end}
                                        onChange={(e) => setEnd(e)}
                                        dateFormat='dd.MM.yyyy'
                                        locale="de"
                                        className='couponInput'
                                        selectsEnd
                                        startDate={start}
                                        endDate={end}
                                        required
                                    />
                                </div>

                                <button className='submitFormBtn' onClick={handleSubmit}>
                                    Hinzufügen
                                </button>
                            </div>
                        )
                        }
                    </form>

                </div>
            </>,
            document.getElementById('portal')
        )
    }

    return null;
});

const MODAL_STYLES = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#FFF',
    padding: '50px',
    zIndex: 1000
}

const OVERLAY_STYLES = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, .7)',
    zIndex: 1000
}

export default ModalForm;