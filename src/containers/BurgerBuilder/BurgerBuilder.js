import React, {Component} from 'react';
import Aux from '../../hoc/Auxilliary/Auxilliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';
import axios from '../../axios-orders';



export class BurgerBuilder extends Component {
	state = {
		purchasing: false,
	}

	componentDidMount() {
		this.props.onInitIngredients();
	}

	purchaseHandler = () => {
		if(this.props.isAuthenticated) {
			this.setState({purchasing: true});
		} else {
			this.props.onAuthSetRedirectPath('/checkout');
			this.props.history.push('/auth');
		}
		
	}

	purchaseCancelHandler = () => {
		this.setState({purchasing: false});
	}

	purchaseContinueHandler = () => {
		this.props.onInitPurchase();
		this.props.history.push('/checkout');
	}

	updatePurchaseState = (ingredients) => {
		const sum = Object.keys(ingredients)
			.map(igKey => {
				return ingredients[igKey];
			})
			.reduce((sum, el) => {
				return sum += el;
			}, 0);
		return sum > 0
	}

	render() {
		const disabledInfo = {
			...this.props.ings
		}
		for(let key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0;
		}
		
		
		let burger = this.props.error ? <p style={{color: 'red', textAlign: 'center'}}>Ingredients cannot be loaded!</p> : <Spinner/>
		let orderSummary = null;

		if(this.props.ings) {
			burger = (
				<Aux>
					<Burger ingredients={this.props.ings}/>
					<BuildControls 
					addedIngredient={this.props.onIngredientAdded}
					removedIngredient={this.props.onIngredientRemoved}
					disabled={disabledInfo}
					price={this.props.price}
					purchasable={this.updatePurchaseState(this.props.ings)}
					isAuth={this.props.isAuthenticated}
					ordered={this.purchaseHandler}
					/>
				</Aux>
			);
			orderSummary = <OrderSummary 
					ingredients={this.props.ings}
					purchaseCancelled={this.purchaseCancelHandler}
					purchaseContinued={this.purchaseContinueHandler}
					price={this.props.price}
					/>
		}

		return (
			<Aux>
				<Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
					{orderSummary}
				</Modal>
				{burger}
			</Aux>
		);
	}
}

const mapStateToProps = state => {
	return {
		ings: state.burgerBuilder.ingredients,
		price: state.burgerBuilder.totalPrice,
		error: state.burgerBuilder.error,
		isAuthenticated: state.auth.token !== null,
	};
}

const mapDispatchToProps = dispatch => {
	return {
		onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
		onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
		onInitIngredients: () => dispatch(actions.initIngredients()),
		onInitPurchase: () => dispatch(actions.purchaseInit()),
		onAuthSetRedirectPath: (path) => dispatch(actions.authSetRedirectPath(path)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));