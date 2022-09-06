const app = require('express');
const router = app.Router();
const item_controller = require('../controllers/item_controller')

router.put('/:email', async (req,res) => { //if you don't use res.something the request is left hanging
    const item = req.body;//the body is a json object
    try{
        const addition = await item_controller.add_item(item);//you use promise syntax here because you want  your users to be able to whatever else while on your page
        res.send({message: "item inserted!"});
    }catch (error) { //error is an option identifier to hold the caugh exception
        res.send({message: error});
    }
});

router.get('/', async (req,res) => {
    const {email} = req.body;//destructures body
    try{
        const items = await item_controller.get_user_items(email);//if you do not use async/await you will not get anything
        res.json(items);
    } catch (error){
        res.send({message: error});
    }
});

router.delete('/', async (req,res) => {
    const item = req.body; //needs to contain everything for primary key
    try{
        const deletion = await item_controller.delete_item(item);
        res.send({message: "item deleted"});
    } catch (error) {
        console.log(error);
        res.status(500).json({err: error})
    }
})

module.exports = router;
