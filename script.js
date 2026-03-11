// Загрузка корзины из localStorage
let total = localStorage.getItem("cartTotal") 
    ? parseInt(localStorage.getItem("cartTotal")) 
    : 0;

document.getElementById("cartTotal").textContent = total;

function addToCart(price) {
    total += price;
    localStorage.setItem("cartTotal", total);
    document.getElementById("cartTotal").textContent = total;
}

// Модальное окно
function openModal() {
    document.getElementById("modal").style.display = "flex";
}

function closeModal() {
    document.getElementById("modal").style.display = "none";
}

// Валидация формы
function submitForm() {
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let message = document.getElementById("message");

    if (name === "" || email === "") {
        message.style.color = "red";
        message.textContent = "Пожалуйста, заполните все поля!";
    } else {
        message.style.color = "green";
        message.textContent = "Регистрация успешна!";
    }
}

function register(){

let message = document.getElementById("profileMessage");

message.style.color = "green";
message.textContent = "Вы успешно зарегистрировались!";

}
function openProfile(){
document.getElementById("profileModal").style.display = "flex";
}

function closeProfile(){
document.getElementById("profileModal").style.display = "none";
}


function openEvents(){
document.getElementById("eventsModal").style.display = "flex";
}

function closeEvents(){
document.getElementById("eventsModal").style.display = "none";
}


function openHours(){
document.getElementById("hoursModal").style.display = "flex";
}

function closeHours(){
document.getElementById("hoursModal").style.display = "none";
}


function loginUser(){

let message = document.getElementById("profileMessage");

message.style.color = "green";
message.textContent = "Вы вошли в профиль!";

}
function openProfile(){

document.getElementById("profileModal").style.display="flex";

let savedName = localStorage.getItem("username");

if(savedName){

document.getElementById("profileTitle").textContent="Ваш профиль";

document.getElementById("profileMessage").textContent="Здравствуйте, "+savedName+" 👋";

}

}

function closeProfile(){
document.getElementById("profileModal").style.display="none";
}

function registerUser(){

let name=document.getElementById("profileName").value;

let message=document.getElementById("profileMessage");

if(name===""){

message.style.color="red";
message.textContent="Введите имя";

return;

}

localStorage.setItem("username",name);

message.style.color="green";
message.textContent="Добро пожаловать, "+name+"!";

document.getElementById("profileTitle").textContent="Ваш профиль";

}

function logoutUser(){

localStorage.removeItem("username");

document.getElementById("profileMessage").textContent="Вы вышли из аккаунта";

}
// Открытие профиля
function openProfile(){
    document.getElementById("profileModal").style.display = "flex";

    // Загружаем данные пользователя из localStorage
    let firstName = localStorage.getItem("firstName") || "";
    let lastName = localStorage.getItem("lastName") || "";
    let email = localStorage.getItem("email") || "";

    if(firstName || lastName || email){
        document.getElementById("profileTitle").textContent = "Ваш профиль";
        document.getElementById("profileMessage").textContent = `Здравствуйте, ${firstName} ${lastName} 👋`;
    } else {
        document.getElementById("profileTitle").textContent = "Регистрация";
        document.getElementById("profileMessage").textContent = "";
    }

    document.getElementById("firstName").value = firstName;
    document.getElementById("lastName").value = lastName;
    document.getElementById("email").value = email;
}

// Закрытие профиля
function closeProfile(){
    document.getElementById("profileModal").style.display = "none";
}

// Сохранение данных профиля
function saveProfile(){
    let firstName = document.getElementById("firstName").value.trim();
    let lastName = document.getElementById("lastName").value.trim();
    let email = document.getElementById("email").value.trim();
    let message = document.getElementById("profileMessage");

    if(!firstName || !lastName || !email){
        message.style.color = "red";
        message.textContent = "Пожалуйста, заполните все поля!";
        return;
    }

    // Сохраняем в localStorage
    localStorage.setItem("firstName", firstName);
    localStorage.setItem("lastName", lastName);
    localStorage.setItem("email", email);

    message.style.color = "green";
    message.textContent = `Данные сохранены! Привет, ${firstName} ${lastName} 👋`;

    document.getElementById("profileTitle").textContent = "Ваш профиль";
}

// Выход
function logoutUser(){
    localStorage.removeItem("firstName");
    localStorage.removeItem("lastName");
    localStorage.removeItem("email");

    document.getElementById("profileMessage").style.color = "black";
    document.getElementById("profileMessage").textContent = "Вы вышли из аккаунта";

    document.getElementById("firstName").value = "";
    document.getElementById("lastName").value = "";
    document.getElementById("email").value = "";

    document.getElementById("profileTitle").textContent = "Регистрация";
}
// Открыть корзину
function openCart() {
    updateCartModal();
    document.getElementById('cartModal').style.display = 'flex';
}

// Закрыть корзину
function closeCart() {
    document.getElementById('cartModal').style.display = 'none';
}

// Обновить содержимое модального окна корзины
function updateCartModal() {
    let cartItemsDiv = document.getElementById('cartItems');
    cartItemsDiv.innerHTML = '';  // Очистить содержимое

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let totalSum = 0;

    if(cart.length === 0) {
        cartItemsDiv.innerHTML = '<p>Корзина пуста.</p>';
    } else {
        cart.forEach((item, index) => {
            totalSum += item.price;
            let div = document.createElement('div');
            div.style.marginBottom = '10px';
            div.textContent = `${item.name} - ${item.price} mdl`;
            cartItemsDiv.appendChild(div);
        });
    }
    
    document.getElementById('cartTotalSum').textContent = totalSum;
    document.getElementById('cartCount').textContent = `(${cart.length})`;
}

// Добавить товар в корзину (обнови функцию, если уже есть)
function addToCart(price, name) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push({name, price});
    localStorage.setItem('cart', JSON.stringify(cart));

    // Обновить счётчик в меню и итог
    document.getElementById('cartCount').textContent = `(${cart.length})`;

    let total = cart.reduce((sum, item) => sum + item.price, 0);
    localStorage.setItem("cartTotal", total);
    document.getElementById("cartTotal").textContent = total;
}

// Очистить корзину
function clearCart() {
    localStorage.removeItem('cart');
    localStorage.removeItem('cartTotal');
    document.getElementById('cartCount').textContent = '(0)';
    document.getElementById('cartTotal').textContent = '0';
    updateCartModal();
}
// Открыть окно оформления заказа
function openOrder() {
    closeCart(); // Закрываем корзину
    document.getElementById('orderModal').style.display = 'flex';
}

// Закрыть окно оформления заказа
function closeOrder() {
    document.getElementById('orderModal').style.display = 'none';
    clearOrderForm();
}

// Очистить форму заказа
function clearOrderForm() {
    document.getElementById('orderName').value = '';
    document.getElementById('orderSurname').value = '';
    document.getElementById('orderEmail').value = '';
    document.getElementById('orderPhone').value = '';
    document.getElementById('orderAddress').value = '';
    document.getElementById('orderMessage').textContent = '';
}

// Отправка заказа
function submitOrder() {
    const name = document.getElementById('orderName').value.trim();
    const surname = document.getElementById('orderSurname').value.trim();
    const email = document.getElementById('orderEmail').value.trim();
    const phone = document.getElementById('orderPhone').value.trim();
    const address = document.getElementById('orderAddress').value.trim();
    const messageEl = document.getElementById('orderMessage');

    if (!name || !surname || !email || !phone || !address) {
        messageEl.style.color = 'red';
        messageEl.textContent = 'Пожалуйста, заполните все поля!';
        return;
    }

    // Здесь можно добавить отправку данных на сервер через fetch/ajax

    messageEl.style.color = 'green';
    messageEl.textContent = 'Спасибо! Ваш заказ принят.';

    // Очистить корзину после заказа
    clearCart();

    // Очистить форму через 3 секунды и закрыть окно
    setTimeout(() => {
        closeOrder();
    }, 3000);
}
document.getElementById('siteSearch').addEventListener('keydown', function(e) {
  if (e.key === 'Enter') {
    e.preventDefault();
    const query = e.target.value.trim().toLowerCase();

    // Сопоставление запросов с ID секций
    const map = {
      'дом': 'hero',
      'главная': 'hero',
      'прими участие': 'volunteer-opportunities',
      'возможности волонтеров': 'volunteer-opportunities',
      'контакты': 'footer',
      'почта': 'footer',
      'адрес': 'footer',
      'номер': 'footer',
      // можно добавить другие ключевые слова
    };

    const targetId = map[query];

    if (targetId) {
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      alert('По вашему запросу ничего не найдено.');
    }
  }
});