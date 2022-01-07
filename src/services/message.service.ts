import { Service } from 'typedi';
import Message from '../entities/message.entity';
import { CreateMessageInput } from '../input/message.input';

@Service()
class MessageService {
  constructor() {}

  public async create(payload: CreateMessageInput) {
    const response = await Message.create(payload).save();
    return response.id;
  }
}

export default MessageService;
