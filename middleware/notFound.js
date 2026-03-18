function notFound(req, res, next) {
    res.status(404).json({ error: "Pagina non trovata" });
}

export default notFound;