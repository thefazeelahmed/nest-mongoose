import { HttpStatus } from '@nestjs/common';
import { APIFeatures } from './apiFeatures';

export const deleteOne = async (Model, id, response) => {
  const doc = await Model.findByIdAndDelete(id);

  if (!doc) {
    return response
      .status(HttpStatus.NOT_FOUND)
      .send(JSON.stringify('No document found with that ID'));
  }

  response.status(HttpStatus.OK).send({
    status: 'success',
    data: null,
  });
};

export const getOne = async (Model, id, popOptions, response) => {
  let query = Model.findById(id);
  if (popOptions) query = query.populate(popOptions);
  const doc = await query;

  if (!doc) {
    return response
      .status(HttpStatus.NOT_FOUND)
      .send(JSON.stringify('No document found with that ID'));
  }

  response.status(HttpStatus.OK).send({
    status: 'success',
    data: doc,
  });
};

export const getAll = async (Model, req, res, options) => {
  const filter = {
    isActive: true,
    isDeleted: false,
  };

  const query = Model.find(filter);
  const countQuery = Model.find(filter);

  const features = new APIFeatures(query, (req.query = {}))
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const countFeatures = new APIFeatures(countQuery, req.query).filter();

  if (options?.populate) query.populate(options.populate);
  const doc = await features.query;
  const docCount = await countFeatures.query.countDocuments();

  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    totalCount: docCount,
    results: doc.length,
    data: {
      data: doc,
    },
  });
};
