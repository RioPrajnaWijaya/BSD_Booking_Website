import Room from "../models/Room.js";

export const createRoom = async (req, res, next) => {
    const newRoom = new Room(req.body)

    try {
        const savedRoom = await newRoom.save()
        res.status(200).json(savedRoom);
    }
    catch (err) {
        next(err);
    }
}

export const updateRoom = async (req, res, next) => {
    try {
        const updatedRoom = await Room.findByIdAndUpdate(
            req.params.id, 
            {$set : req.body},
            {new : true}
        );

        res.status(200).json(updatedRoom);
    }
    catch (err) {
        next(err);
    }
}

export const deleteRoom = async (req, res, next) => {
    try {
        await Room.findByIdAndDelete(
            req.params.id
        );

        res.status(200).json("Room has been deleted");
    }
    catch (err) {
        next(err);
    }
}

export const getRoom = async (req, res, next) => {
    try {
        console.log(req.params.id);
        const room = await Room.findById(req.params.id);

        res.status(200).json(room);
    }
    catch (err) {
        next(err);
    }
}

export const getAllRoom = async (req, res, next) => {
    try {
      let query = Room.find();
  
      const roomType = req.query.type;
      if (roomType) {
        query = query.where("type").equals(roomType);
      }
  
      const rooms = await query.exec();
      res.status(200).json(rooms);
    } catch (err) {
      next(err);
    }
  };  

export const countRoom = async (req, res, next) => {
    const types = req.query.type.split(',');
    const rooms = await Room.find()


    try {
        const list = await Promise.all(types.map(type => {
            var result = rooms.filter(obj => {
                return obj.type == type
              })
            // console.log(result)
            return result
        }))

        const grouped = []
        list.map(r => {
            r.map(s =>{
                grouped.push(s.roomNumbers.length)
            })
        })
        // console.log(grouped)
        res.status(200).json(grouped);
    }
    catch (err) {
        next(err);
    }
}

export const updateRoomAvailability = async (req, res, next) => {
  try {
    await Room.updateOne(
      { "roomNumbers._id": req.params.id },
      {
        $push: {
          "roomNumbers.$.unavailableDates": req.body.dates
        },
      }
    );
    res.status(200).json("Room status has been updated.");
  } catch (err) {
    next(err);
  }
};

// export const getRoomNumber = async (req, res, next) => {
//   try {
//     let query = Room.find();

//     const roomNumber = req.query.roomNumbers;
//     if (roomNumber) {
//       query = query.where("number").equals(roomNumber);
//     }

//     const rooms = await query.exec();
//     res.status(200).json(rooms);
//   } catch (err) {
//     next(err);
//   }
// };  