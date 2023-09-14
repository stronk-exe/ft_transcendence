import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { RoomUsersService } from './room-users.service';
import { Public } from "src/decorator";

@Public()
@Controller('roomUsers')
export class RoomUsersController {
    constructor(private roomUsersService: RoomUsersService) {}

    @Get()
    async getAllRoomUsers() {
        return this.roomUsersService.getAllRoomUsers()
    }

    @Get('/:roomId')
    async getRoomUsers(@Param('roomId', ParseIntPipe) roomId: number) {
        return this.roomUsersService.getRoomUsers(roomId)
    }

    @Get('/:roomId')
    async getRoomAdmins(@Param('roomId', ParseIntPipe) roomId: number) {
        return this.roomUsersService.getRoomAdmins(roomId)
    }

    @Post()
    async createRoomUsers(@Body('roomId', ParseIntPipe) roomId: number, @Body('userId', ParseIntPipe) userId: number) {
        return this.roomUsersService.createRoomUsers(roomId, userId)
    }
}
