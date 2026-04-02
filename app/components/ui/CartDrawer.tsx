import { AnimatePresence, motion } from "framer-motion";
import { useCartStore } from "~/store/cart";
import { X, ShoppingBag, Minus, Plus, Trash2 } from "lucide-react";

function formatPrice(amount: string, currencyCode: string) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: currencyCode,
  }).format(parseFloat(amount));
}

export function CartDrawer() {
  const { cart, isOpen, closeCart } = useCartStore();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-40 backdrop-blur-sm"
            onClick={closeCart}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-cream z-50 flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-sand">
              <div className="flex items-center gap-2">
                <ShoppingBag size={20} className="text-forest" />
                <h2 className="font-display text-xl">Your Cart</h2>
                {cart && cart.totalQuantity > 0 && (
                  <span className="bg-forest text-black text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {cart.totalQuantity}
                  </span>
                )}
              </div>
              <button
                onClick={closeCart}
                className="p-2 hover:bg-sand rounded-full transition-colors"
                aria-label="Close cart"
              >
                <X size={18} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {!cart || cart.lines.nodes.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
                  <ShoppingBag size={48} className="text-white/20" />
                  <p className="font-display text-xl text-white/50">Your cart is empty</p>
                  <p className="text-sm text-white/40">Add some items to get started</p>
                  <button onClick={closeCart} className="btn-outline mt-4">
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <ul className="space-y-4">
                  {cart.lines.nodes.map((line) => (
                    <li key={line.id} className="flex gap-4 py-4 border-b border-sand last:border-0">
                      {line.merchandise.product.featuredImage && (
                        <img
                          src={line.merchandise.product.featuredImage.url}
                          alt={line.merchandise.product.featuredImage.altText || line.merchandise.product.title}
                          className="w-20 h-20 object-cover bg-sand flex-shrink-0"
                        />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{line.merchandise.product.title}</p>
                        <p className="text-xs text-white/50 mt-0.5">{line.merchandise.title}</p>
                        <p className="text-sm font-medium mt-1">
                          {formatPrice(line.merchandise.price.amount, line.merchandise.price.currencyCode)}
                        </p>
                        <div className="flex items-center gap-3 mt-2">
                          <button className="w-7 h-7 border border-sand flex items-center justify-center hover:border-forest transition-colors">
                            <Minus size={12} />
                          </button>
                          <span className="text-sm font-medium w-4 text-center">{line.quantity}</span>
                          <button className="w-7 h-7 border border-sand flex items-center justify-center hover:border-forest transition-colors">
                            <Plus size={12} />
                          </button>
                          <button className="ml-auto text-white/40 hover:text-red-400 transition-colors">
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Footer */}
            {cart && cart.lines.nodes.length > 0 && (
              <div className="border-t border-sand px-6 py-6 space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">Subtotal</span>
                  <span className="font-medium">
                    {formatPrice(cart.cost.subtotalAmount.amount, cart.cost.subtotalAmount.currencyCode)}
                  </span>
                </div>
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>
                    {formatPrice(cart.cost.totalAmount.amount, cart.cost.totalAmount.currencyCode)}
                  </span>
                </div>
                <a
                  href={cart.checkoutUrl}
                  className="btn-primary w-full text-center block"
                >
                  Checkout
                </a>
                <button onClick={closeCart} className="w-full text-center text-sm text-white/50 hover:text-forest transition-colors">
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
