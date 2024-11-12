// Attendre que le DOM soit entièrement chargé
document.addEventListener("DOMContentLoaded", function () {
  // Classe CartItem pour gérer chaque article individuellement
  class CartItem {
      constructor(element) {
          this.element = element;
          this.price = parseInt(this.element.querySelector('.prix').textContent.trim());
          this.quantityInput = this.element.querySelector('.quantite');
          this.totalElement = this.element.querySelector('.total');
          this.likeButton = this.element.querySelector('.liked');
          this.plusButton = this.element.querySelector('.btnPlus');
          this.minusButton = this.element.querySelector('.btn-outline-warning');
          this.deleteButton = this.element.querySelector('.btn-outline-danger');

          // Initialiser les événements
          this.initEvents();

          // Calculer le total initial de cet article
          this.updateTotal();
      }

      // Initialiser les événements pour chaque bouton
      initEvents() {
          this.plusButton.addEventListener('click', this.incrementQuantity.bind(this));
          this.minusButton.addEventListener('click', this.decrementQuantity.bind(this));
          this.deleteButton.addEventListener('click', this.deleteItem.bind(this));
          this.likeButton.addEventListener('click', this.toggleLike.bind(this));
      }

      // Méthode pour augmenter la quantité
      incrementQuantity() {
          this.quantityInput.value = parseInt(this.quantityInput.value) + 1;
          this.updateTotal();
          shoppingCart.updateGrandTotal();
      }

      // Méthode pour diminuer la quantité
      decrementQuantity() {
          if (parseInt(this.quantityInput.value) > 1) {
              this.quantityInput.value = parseInt(this.quantityInput.value) - 1;
              this.updateTotal();
              shoppingCart.updateGrandTotal();
          }
      }

      // Méthode pour supprimer l'article du panier
      deleteItem() {
          this.element.remove();
          shoppingCart.removeItem(this);
          shoppingCart.updateGrandTotal();
      }

      // Méthode pour basculer entre aimer/ne pas aimer
      toggleLike() {
          this.likeButton.classList.toggle('fas');
          this.likeButton.classList.toggle('far');
      }

      // Méthode pour calculer le total de cet article
      updateTotal() {
          const quantity = parseInt(this.quantityInput.value);
          const total = this.price * quantity;
          this.totalElement.textContent = total;
          return total;
      }
  }

  // Classe ShoppingCart pour gérer l'ensemble du panier
  class ShoppingCart {
      constructor() {
          this.cartItems = [];
          this.grandTotalElement = document.querySelector('.Prixtotal');
          this.loadCartItems();
      }

      // Charger tous les articles existants dans le panier
      loadCartItems() {
          const allArticles = document.querySelectorAll('.article');
          allArticles.forEach(article => {
              const cartItem = new CartItem(article);
              this.cartItems.push(cartItem);
          });
          this.updateGrandTotal();
      }

      // Méthode pour mettre à jour le total général du panier
      updateGrandTotal() {
          let grandTotal = 0;
          this.cartItems.forEach(cartItem => {
              grandTotal += cartItem.updateTotal();
          });
          this.grandTotalElement.value = grandTotal;
      }

      // Méthode pour supprimer un article du tableau des articles
      removeItem(cartItem) {
          this.cartItems = this.cartItems.filter(item => item !== cartItem);
      }
  }

  // Initialiser le panier
  const shoppingCart = new ShoppingCart();
});
