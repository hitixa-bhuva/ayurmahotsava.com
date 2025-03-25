function redirectToWhatsApp() {
    var phoneNumber = "+918239677909"; // No extra space at the end
    var message = ""; // Optional message
    var url =
      "https://api.whatsapp.com/send?phone=" +
      encodeURIComponent(phoneNumber) +
      "&text=" +
      encodeURIComponent(message);
    window.open(url, "_blank");
}
