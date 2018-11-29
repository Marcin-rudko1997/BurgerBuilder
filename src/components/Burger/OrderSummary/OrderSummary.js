import React, {Component} from 'react';
import Aux from '../../../hoc/Auxilliary/Auxilliary';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
	//Component can be functional -----------
			
	render() {
		const ingredientSummary = Object.keys(this.props.ingredients)
			.map(igKey => {
				return <span style={{textTransform: 'capitalize'}} key={igKey}><li> {igKey}: {this.props.ingredients[igKey]}</li></span>;
			})
		return (
		<Aux>
			<h3>Your Order </h3>
			<p>Delicious burger with the following ingredients: </p>
			<ul>
			{ingredientSummary}
			</ul>
			<p><strong>Total price: {this.props.price.toFixed(2)}</strong></p>
			<p>Continue to checkout? </p>
			<Button clicked={this.props.purchaseCancelled} btnType="Danger">CANCEL</Button>
			<Button clicked={this.props.purchaseContinued} btnType="Success">CONTINUE</Button>
		</Aux>
	  );
	}
}

export default OrderSummary;