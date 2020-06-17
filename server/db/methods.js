/* eslint-disable camelcase */
const { User, Movement, UserMovement } = require('./index');

// MODEL METHODS
// note: organizer is term for users that create movements
// only one table for all users - organizers & participants
// all users are participants, some users are organizers

// ADD NEW USER
const addUser = async(userObj) => {
  try {
    await User.create(userObj);
  } catch (err) {
    console.error(err);
  }
};

// GET USER BY USERNAME
const getUserByUsername = async(username) => {
  try {
    const user = await User.findOne({ where: { username } });
    return user;
  } catch (err) {
    console.error(err);
  }
};

// GET USER BY ID
const getUserById = async(userId) => {
  try {
    const user = await User.findOne({ where: { id: userId } });
    return user;
  } catch (err) {
    console.error(err);
  }
};

// EDIT USER BY FIELD
const editUserField = async(userId, prop, newValue) => {
  try {
    await User.update({ [prop]: newValue },
      { returning: true, where: { id: userId } });
  } catch (err) {
    console.error(err);
  }
};

// UPDATE ENTIRE USER'S RECORD
const editUser = async(userObj) => {
  try {
    await User.update(userObj,
      { returning: true, where: { id: userObj.id } });
  } catch (err) {
    console.error(err);
  }
};

// ORGANIZER ADDS NEW MOVEMENT
// one to many relationship
const addMovement = async(movementObj, userId) => {
  // get the organizer's record
  try {
    const user = await User.findOne({ where: { id: userId } });
    // create the movement
    const movement = await Movement.create(movementObj);
    // set the user (organizer) foreign key
    movement.setUser(user);
    return movement;
  } catch (err) {
    console.error(err);
  }
};

// EDIT MOVEMENT BY FIELD
const editMovementField = async(movementId, prop, newValue) => {
  try {
    await Movement.update({ [prop]: newValue },
      { returning: true, where: { id: movementId } });
  } catch (err) {
    console.error(err);
  }
};

// UPDATE ENTIRE MOVEMENT'S RECORD
const editMovement = async(movementObj) => {
  try {
    await Movement.update(movementObj,
      { returning: true, where: { id: movementObj.id } });
  } catch (err) {
    console.error(err);
  }
};

// Get Movement by ID
const getMovement = async(movementId) => {
  try {
    const movement = await Movement.findOne({
      where: { id: movementId },
      raw: true,
    });
    return movement;
  } catch (err) {
    console.error(err);
  }
};

// USER JOINS MOVEMENT
const linkUserMovement = async(userId, movementId) => {
  try {
    const user = await User.findOne({ where: { id: userId } });
    const movement = await Movement.findOne({ where: { id: movementId } });
    movement.addUser(user);
  } catch (err) {
    console.error(err);
  }
};

// GET MOVEMENTS LED BY USER
const getMovementsLedByUser = async(idUser) => {
  try {
    return await Movement.findAll({
      where: { id_organizer: idUser },
      raw: true,
    });
  } catch (err) {
    console.error(err);
  }
};

// FIND MOVEMENTS FOLLOWED BY USER
const getMovementsFollowedByUser = async(idUser) => {
  try {
    const movementIds = await UserMovement.findAll({
      attributes: ['id_movement'],
      where: { id_user: idUser },
      raw: true,
    });
    return await Promise.all(
      movementIds.map(({ id_movement }) => getMovement(id_movement)),
    );
  } catch (err) {
    console.error(err);
  }
};

// const test = async() => {
//   const result = await getMovementsFollowedByUser(1);
//   console.log(result);
// };
// test();

module.exports = {
  // addComment,
  // addPrompt,
  addMovement,
  // addPolitician,
  addUser,
  // linkPoliticianMovement,
  linkUserMovement,
  editMovement,
  editMovementField,
  // editPolitician,
  // editPoliticianField,
  editUser,
  editUserField,
  getUserById,
  getUserByUsername,
  getMovement,
  getMovementsLedByUser,
  getMovementsFollowedByUser,
};

/* Features below were trimmed due to time constraints...

// ADD NEW POLITICIAN
const addPolitician = async(politicianObj) => {
  try {
    await Politician.create(politicianObj);
  } catch (err) {
    console.error(err);
  }
};

// EDIT POLITICIAN BY FIELD
const editPoliticianField = async(politicianId, prop, newValue) => {
  try {
    await Politician.update({ [prop]: newValue },
      { returning: true, where: { id: politicianId } });
  } catch (err) {
    console.error(err);
  }
};

// UPDATE ENTIRE POLITICIAN'S RECORD
const editPolitician = async(politicianObj) => {
  try {
    await Politician.update(politicianObj,
      { returning: true, where: { id: politicianObj.id } });
  } catch (err) {
    console.error(err);
  }
};

// LINK POLITICIAN TO MOVEMENT
// pass in politician and movement ids
const linkPoliticianMovement = async(politicianId, movementId) => {
  try {
    const politician = await Politician.findOne({ where: { id: politicianId } });
    const movement = await Movement.findOne({ where: { id: movementId } });
    politician.addMovement(movement);
  } catch (err) {
    console.error(err);
  }
};
*/

/*
// USER COMMENTS ON MOVEMENT
const addComment = async(userId, movementId, message) => {
  try {
    const comment = await Comment.create({ comment_text: message });
    const user = await User.findOne({ where: { id: userId } });
    const movement = await Movement.findOne({ where: { id: movementId } });
    comment.setUser(user);
    comment.setMovement(movement);
  } catch (err) {
    console.error(err);
  }
};

// ORGANIZER ADDS PROMPT
const addPrompt = async(politicianId, movementId, message) => {
  try {
    const prompt = await Prompt.create({ prompt_text: message });
    const politician = await Politician.findOne({ where: { id: politicianId } });
    const movement = await Movement.findOne({ where: { id: movementId } });
    prompt.setPolitician(politician);
    prompt.setMovement(movement);
  } catch (err) {
    console.error(err);
  }
};
*/
