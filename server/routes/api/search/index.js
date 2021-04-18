const router = require("express").Router();
const { searchController } = require("../../../controllers");

// api/search/:action/:search
router.route("/:action/:search").get(searchController.getSearchResults);

module.exports = router;
