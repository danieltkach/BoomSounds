
import React, { useEffect, useState } from "react"
// import './ShopCart.module.css';

import styles from './Orders.module.css';
import { cancelCart, saleCart, getSaleCart, getCancelCart, fetchAllShopCarts } from '../../redux/users/actions';
import { connect } from 'react-redux'
import axios from "axios";

const Status = ({ shopcart, getSaleCart, getCancelCart, fetchAllShopCarts }) => {
	const [statusId, setStatusId] = useState(["asd"])

	const cancelOrder = (shopCart, userID) => {
		getCancelCart(shopCart, userID)
	}
	const completeOrder = (shopCart, userID) => {
		getSaleCart(shopCart, userID)
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		var status = document.getElementById("status").value
		fetchAllShopCarts()
		console.log("esto", shopcart)
		setStatusId(shopcart.filter(r => r.status == status))
	}
	useEffect(() => {
		var status = document.getElementById("status").value
		setStatusId(shopcart.filter(r => r.status == status))
	}, [shopcart])
	return (
		<div className={styles.orders_container}>
			{console.log("esto", shopcart)}
			<form onSubmit={handleSubmit}>
				<select id="status"
					className='orders-input'
				>
					<option value="open">Abiertas</option>
					<option value="completed">Completadas</option>
					<option value="cancelled">Canceladas</option>
				</select>
				<button type="submit">buscar</button>
			</form>
			{console.log("statusId", statusId)}
			<div> {statusId.map(a => {
				return (
					<div >
						<table className={styles.tb_listProd}>
							<thead>
								<th>PRODUCTOS</th>
								<th>ID DEL USUARIO</th>
								<th>ID CARRITO</th>
								<th>TOTAL</th>
							</thead>
							<tr className={styles.tr_table}>
								<td>
									{a.products?.map(r => <li>{r.name}</li>)}
								</td>
								<td>
									{a.userId}
								</td>
								<td>
									{a.id}
								</td>
								<td>
									$ {a.products?.reduce((ac, prod) =>
									ac + prod.price, 0)}
								</td>
							</tr>
						</table>
						{a.status == 'open' ? (
							<>
								<button className={styles.cancelOrder} onClick={() => cancelOrder(a.id, a.userId)}>
									Cancelar orden</button>
								<button className={styles.completeOrder} onClick={() => completeOrder(a.id, a.userId)}>
									Completar Orden</button>
							</>)
							: ''
						}
					</div>
				)
			})}</div>
		</div>
	)
}



const mapStateToProps = (state) => {
	return {
		IdUser: state.users.userID,
		shopcart: state.users.shopcartSt
	}
}

export default connect(mapStateToProps, { cancelCart, saleCart, getSaleCart, getCancelCart, fetchAllShopCarts })(Status)