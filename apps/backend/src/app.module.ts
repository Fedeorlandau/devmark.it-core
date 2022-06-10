import { Module } from "@nestjs/common";
import { EventsModule } from "./events/events.module";
import { InMemoryDBModule } from "@nestjs-addons/in-memory-db";
import { ScheduleModule } from "@nestjs/schedule";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    ConfigModule.forRoot(),
    EventsModule,
    InMemoryDBModule.forRoot({}),
    ScheduleModule.forRoot(),
  ],
})
export class AppModule {}
