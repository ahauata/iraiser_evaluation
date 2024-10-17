function deleteTOS() {
  const footerLinks = document.querySelectorAll(
    "footer a[href*='conditions-generales']"
  );

  footerLinks.forEach((link) => {
    const parentLi = link.closest("li");
    if (parentLi) {
      parentLi.remove();
    }
  });
}

document.onreadystatechange = () => {
  if (document.readyState == "complete") {
    deleteTOS();
  }
};
