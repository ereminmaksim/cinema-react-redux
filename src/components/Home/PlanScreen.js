import React, {useEffect, useState} from 'react';
import db from "../../firebase/firebase";
import {useSelector} from "react-redux";
import {selectUser} from "../../features/user/userSlice";
import {loadStripe} from "@stripe/stripe-js";

const PlanScreen = () => {
    const [products, setProducts] = useState([])
    const [subscription, setSubscription] = useState(null)

    const user = useSelector(selectUser)


    useEffect(() => {
        db.collection("customers")
            .doc(user.uid)
            .collection("subscriptions")
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach(async (subscription) => {
                    setSubscription({
                        role: subscription.data().role,
                        current_period_end: subscription.data().current_period_end.seconds,
                        current_period_start: subscription.data().current_period_start
                            .seconds,
                    });
                });
            });
    }, [user.uid]);


    useEffect(() => {
        db.collection('products')
            .where("active", '==', true)
            .get()
            .then(querySnapshot => {
                const products = {}
                querySnapshot.forEach(async (productDoc) => {
                    products[productDoc.id] = productDoc.data()
                    const priceSnap = await productDoc.ref.collection
                    ('prices').get()
                    priceSnap.docs.forEach((price) => {
                        products[productDoc.id].prices = {
                            priceId: price.id,
                            priceData: price.data()
                        }
                    })
                })
                setProducts(products)
            })
    }, [])

    console.log(products)
    console.log(subscription)


    const loadCheckout = async (priceId) => {
        const docRef = await db
            .collection("customers")
            .doc(user.uid)
            .collection("checkout_sessions")
            .add({
                price: priceId,
                success_url: window.location.origin,
                cancel_url: window.location.origin,
            });

        docRef.onSnapshot(async (snap) => {
            const {error, sessionId} = snap.data();

            if (error) {
                alert(`An error occured: ${error.message}`);
            }

            if (sessionId) {
                const stripe = await loadStripe(
                    "это ваши данные!!!"
                )
                stripe.redirectToCheckout({sessionId});
            }
        })
    }


    return (
        <div className="planScreen">
            <br/>
            {subscription &&
                <p>Plan: {subscription?.role}</p>
            }
            <br/>
            {subscription &&
                <p>Renewal date: {new Date(subscription?.current_period_end * 1000)
                    .toLocaleDateString()
                }</p>
            }

            {Object.entries(products).map(([productId, productData]) => {
                const isCurrentPackage = productData.name
                    ?.toLowerCase()
                    .includes(subscription?.role)

                return (
                    <div key={productId}
                         className={`${isCurrentPackage && "planScreen__plan--disabled"} planScreen__plan`}
                        // className={`${
                        //     isCurrentPackage && "plansScreen__plan--disabled"
                        // } plansScreen__plan`}
                    >

                        <h5>{productData.name}</h5>
                        <h6>{productData.description}</h6>
                        <img className='w-[50px] h-[50px]'
                             src={productData.images} alt="photo"/>


                        <button className="text-base bg-red-700 btn__login text-white"
                                onClick={() => !isCurrentPackage &&
                                    loadCheckout(productData.prices.priceId)}
                        >
                            {isCurrentPackage ? "Current Package" : "Subscribe"}
                        </button>

                    </div>
                )
            })}
        </div>
    );
}

export default PlanScreen;
