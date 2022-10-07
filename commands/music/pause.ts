import { CommandInteraction, GuildMember, EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { bot } from "@bot";
import { canModifyQueue } from "@utils/queue";
import { MusicQueue } from "@utils/MusicQueue";

export default {
    data: new SlashCommandBuilder()
        .setName("pause")
        .setDescription("Pauses the queue."),
    execute(interaction: CommandInteraction) {
        const queue: MusicQueue = bot.queues.get(interaction.guild?.id as string) as MusicQueue;

        const nothingPlaying = new EmbedBuilder()
            .setColor("#000000")
            .setTitle("Track Player")
            .setDescription("There is nothing playing in the queue currently.");

        const notInBotChannel = new EmbedBuilder()
            .setColor("#000000")
            .setTitle("Track Player")
            .setDescription("You need to join the voice channel the bot is in.");

        if (!canModifyQueue({ member: interaction.member as GuildMember })) return interaction.reply({ embeds: [notInBotChannel], ephemeral: true });
        if (!queue) return interaction.reply({ embeds: [nothingPlaying], ephemeral: true });

        if (queue.player.pause()) {

            const pauseEmbed = new EmbedBuilder()
                .setColor("#000000")
                .setTitle("Track Player")
                .setDescription(`${interaction.user.tag} paused the queue.`);

            interaction.reply({ embeds: [pauseEmbed] });
            return true;
        }
    },
};