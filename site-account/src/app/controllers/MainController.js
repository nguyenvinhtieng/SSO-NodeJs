class MainController {
    renderHome(req, res, next) {
        res.render("./home");
    }
}

module.exports = new MainController();
