import { Service } from 'typedi';
import Message from '../entities/message.entity';
import { CreateMessageInput } from '../input/message.input';

@Service()
class MessageService {
  constructor() {}

  public async getAllByChannelId(channelId: string): Promise<Message[]> {
    const messages = await Message.find({
      where: {
        sourceChannelId: channelId,
      },
    });
    return messages;
  }

  public async create(payload: CreateMessageInput): Promise<Message> {
    const response = await Message.create(payload).save();
    return response;
  }
}

export default MessageService;
