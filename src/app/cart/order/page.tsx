import { getAddress } from "@/actions/getAddress";
import { getCartItem } from "@/actions/getCartItem";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { authOptions } from "@/libs/authOptions";
import { getServerSession } from "next-auth";
import OrderPage from "./components/OrderPage";
import { withAuth } from "@/HOCs/withAuth";

const page = async () => {
  const session = await getServerSession(authOptions);
  const cartItem = await getCartItem((session as any)?.id);
  const address = await getAddress((session as any)?.id);
  return (
    <>
      <Header />

      <OrderPage
        address={address}
        cartItem={cartItem}
        userId={(session as any)?.id}
      />

      <Footer />
    </>
  );
};

export default withAuth(page);
