import { useState } from "react";
import styles from '@/styles/Seats.module.css';

export default function Seat(props) {
    const { is_avaiable, name, id } = props;
    const [selected, setSelected] = useState(false);
    let my_className = selected ? styles.seat_item_selected : is_avaiable ? styles.seat_item_avaiable : styles.seat_item_unavaiable;


    function selectSeat() {
        if (is_avaiable == false) {
            alert('Esse assento não está disponível');

            return;
        }

        if (!selected) {
            props.updt_seats({ name: name, id: id }, true);
            // adiciona esse assento a array de assentos selecionados
        }
        else {
            props.updt_seats({ name: name, id: id }, false);

            // remove esse assento a array de assentos selecionados
        }

        setSelected(!selected);
    }

    return (
        <div className={my_className} data-test="seat" onClick={selectSeat}>{name}</div>
    );


}