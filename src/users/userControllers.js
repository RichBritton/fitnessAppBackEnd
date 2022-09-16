const User = require("./userModel");

exports.addUser = async (req, res) => {
  try
  {
    const newUser = new User(req.body);
    const token = newUser.generateAuthToken();
    await newUser.save();
    res.status(201).send({ user: newUser.name, token });
  }
  catch (error)
  {
    if (error.code === 11000)
    {
      res.status(400).send({ error: "Email already used" });
    }
    else
    {
      res.status(500).send({ error: "Oops" });
    }
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try
  {
    const user = await User.findByCredentials(email, password);
    const token = user.generateAuthToken();
    /*res.status(200).send({ user: user.name, token });*/ //<--old version
    res.status(200).send({ user: user.name });
  }
  catch (error)
  {
    res.status(400).send({ error: error.message });
  }
};


exports.listUsers = async (req, res) => {
  try
  {
      const listUsers = await User.find({});
      const usernames = listUsers.map((users) => {
          return users
      })
      res.status(200).send({users: usernames})
  }
  catch (error)
  {
      console.log(error)
      res.status(500).send({ error: error.message });
  }
}  


exports.removeUser = async (req, res) => {
  const { email, password } = req.body;

  try
  {
    const user = await User.findByCredentials(email, password);
    const uName = user.name;
    await User.deleteOne(user);
    res.status(200).send({ user: uName, message: email+" removed" });
  }
  catch (error)
  {
    res.status(400).send({ error: error.message });
  }
}


exports.updateUser = async (req, res) => {

  const { email, password } = req.body;

  try
  {
    const query = { "email": email };
    const update = { $set: {"password": password} };
    await User.updateOne(query, update);

    res.status(200).send({ message: email+" updated" });
  }
  catch (error)
  {
    res.status(400).send({ error: error.message });
  }
}