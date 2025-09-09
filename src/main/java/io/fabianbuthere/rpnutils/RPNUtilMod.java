package io.fabianbuthere.rpnutils;

import com.mojang.logging.LogUtils;
import net.minecraftforge.common.MinecraftForge;
import net.minecraftforge.event.server.ServerStartingEvent;
import net.minecraftforge.eventbus.api.IEventBus;
import net.minecraftforge.eventbus.api.SubscribeEvent;
import net.minecraftforge.fml.common.Mod;
import net.minecraftforge.fml.event.lifecycle.FMLClientSetupEvent;
import net.minecraftforge.fml.javafmlmod.FMLJavaModLoadingContext;
import org.slf4j.Logger;

@Mod(RPNUtilMod.MOD_ID)
public class RPNUtilMod
{
    public static final String MOD_ID = "rpnutils";
    private static final Logger LOGGER = LogUtils.getLogger();

    public RPNUtilMod()
    {
        IEventBus modEventBus = FMLJavaModLoadingContext.get().getModEventBus();

        modEventBus.addListener(this::clientSetup);

        MinecraftForge.EVENT_BUS.register(this);
    }

    public void clientSetup(final FMLClientSetupEvent event) {
         LOGGER.warn("Server-side mod 'RPNUtils' is present on client.");
    }

    @SubscribeEvent
    public void onServerStarting(ServerStartingEvent event)
    {
        LOGGER.info("RPN Utils mod initialized.");
    }
}